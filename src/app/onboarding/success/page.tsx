import { createClient } from "@/lib/supabase/server";

export default async function SuccessPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: business } = user
    ? await supabase.from("businesses").select("id").eq("user_id", user.id).single()
    : { data: null };

  const webhookUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/crm`;

  return (
    <div className="bg-white rounded-[2.5rem] border border-[#e6e6e6] p-10" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="w-14 h-14 rounded-full bg-[#fff3f0] border border-[#ffd5cc] flex items-center justify-center mb-6">
        <span className="text-2xl text-[#fe4a22] font-bold">✓</span>
      </div>

      <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">You&apos;re all set.</h1>
      <p className="text-neutral-500 text-sm mb-8">
        Your account is active. Connect your CRM to start sending automated review requests.
      </p>

      {business && (
        <div className="bg-[#f9f9f9] rounded-2xl p-6 border border-[#e6e6e6] mb-8">
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">CRM Webhook Setup</p>

          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs font-medium text-neutral-500 mb-1.5">Webhook URL</p>
              <code className="block bg-white border border-[#e6e6e6] rounded-lg px-3 py-2.5 text-xs text-[#1a1a1a] break-all">
                POST {webhookUrl}
              </code>
            </div>

            <div>
              <p className="text-xs font-medium text-neutral-500 mb-1.5">Business ID</p>
              <code className="block bg-white border border-[#e6e6e6] rounded-lg px-3 py-2.5 text-xs text-[#1a1a1a] break-all">
                {business.id}
              </code>
            </div>

            <div>
              <p className="text-xs font-medium text-neutral-500 mb-1.5">Payload format</p>
              <pre className="bg-white border border-[#e6e6e6] rounded-lg px-3 py-2.5 text-xs text-[#1a1a1a] overflow-x-auto">
{`{
  "secret": "<CRM_WEBHOOK_SECRET>",
  "businessId": "${business.id}",
  "customerName": "John Doe",
  "customerPhone": "+15550001234"
}`}
              </pre>
            </div>
          </div>

          <p className="text-xs text-neutral-400 mt-4">
            Your webhook secret is stored in your Euphoric account settings. Contact support to retrieve it.
          </p>
        </div>
      )}

      <a
        href="mailto:support@euphoricreviews.com"
        className="inline-block text-sm text-[#fe4a22] font-medium hover:opacity-80 transition-opacity"
      >
        Email support →
      </a>
    </div>
  );
}
