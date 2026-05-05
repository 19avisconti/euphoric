import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { plan } = await req.json();
  const priceId =
    plan === "standard"
      ? process.env.STRIPE_PRICE_STANDARD!
      : process.env.STRIPE_PRICE_GROWTH!;

  // Create or retrieve Stripe customer
  const existingCustomers = await stripe.customers.list({ email: user.email!, limit: 1 });
  let customerId = existingCustomers.data[0]?.id;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email!,
      metadata: { userId: user.id },
    });
    customerId = customer.id;
  }

  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: "default_incomplete",
    payment_settings: { save_default_payment_method: "on_subscription" },
    expand: ["latest_invoice.payment_intent"],
  });

  const invoice = subscription.latest_invoice as import("stripe").Stripe.Invoice & {
    payment_intent: import("stripe").Stripe.PaymentIntent | null;
  };
  const clientSecret = invoice.payment_intent?.client_secret ?? null;

  return NextResponse.json({ clientSecret });
}
