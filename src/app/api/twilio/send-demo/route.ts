import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendSms } from "@/lib/twilio";

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: userData } = await supabase
    .from("users")
    .select("name, phone")
    .eq("id", user.id)
    .single();

  const { data: business } = await supabase
    .from("businesses")
    .select("name, google_review_url")
    .eq("user_id", user.id)
    .single();

  if (!userData?.phone || !business) {
    return NextResponse.json({ error: "Missing profile data" }, { status: 400 });
  }

  const body = `Hi ${userData.name}! Thanks for choosing ${business.name}. Mind leaving us a quick Google review? ${business.google_review_url ?? ""}`;

  await sendSms(userData.phone, body);

  return NextResponse.json({ success: true });
}
