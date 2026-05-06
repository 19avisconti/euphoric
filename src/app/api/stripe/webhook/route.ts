import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "customer.subscription.created" || event.type === "invoice.paid") {
    const subscription =
      event.type === "customer.subscription.created"
        ? (event.data.object as Stripe.Subscription)
        : null;

    if (subscription) {
      const customer = await stripe.customers.retrieve(subscription.customer as string) as Stripe.Customer;
      const userId = customer.metadata?.userId;
      if (!userId) return NextResponse.json({ received: true });

      const priceId = subscription.items.data[0]?.price.id;
      const plan =
        priceId === process.env.STRIPE_PRICE_STANDARD ? "standard" : "growth";

      await supabase.from("subscriptions").upsert({
        user_id: userId,
        stripe_subscription_id: subscription.id,
        plan,
        status: "active",
      }, { onConflict: "stripe_subscription_id" });
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    await supabase
      .from("subscriptions")
      .update({ status: "canceled" })
      .eq("stripe_subscription_id", subscription.id);
  }

  return NextResponse.json({ received: true });
}
