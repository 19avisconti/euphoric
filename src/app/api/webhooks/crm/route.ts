import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendSms } from "@/lib/twilio";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { secret, customerName, customerPhone, businessId } = await req.json();

  if (secret !== process.env.CRM_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { data: business } = await supabase
    .from("businesses")
    .select("name, google_review_url")
    .eq("id", businessId)
    .single();

  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  // Check opt-out status
  const { data: existingCustomer } = await supabase
    .from("customers")
    .select("id, opted_out")
    .eq("business_id", businessId)
    .eq("phone", customerPhone)
    .single();

  if (existingCustomer?.opted_out) {
    return NextResponse.json({ skipped: true, reason: "opted_out" });
  }

  // Upsert customer record
  const { data: customer } = await supabase
    .from("customers")
    .upsert(
      { business_id: businessId, name: customerName, phone: customerPhone },
      { onConflict: "business_id,phone" }
    )
    .select("id")
    .single();

  const body = `Hi ${customerName}! Thanks for choosing ${business.name}. Mind leaving us a quick Google review? ${business.google_review_url ?? ""}`;
  await sendSms(customerPhone, body);

  await supabase.from("sms_messages").insert({
    business_id: businessId,
    customer_id: customer?.id ?? null,
    status: "sent",
  });

  return NextResponse.json({ success: true });
}
