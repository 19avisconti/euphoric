"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Status = "idle" | "sending" | "sent" | "error";

function TestForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") ?? "growth";

  const [status, setStatus] = useState<Status>("idle");

  async function sendDemo() {
    setStatus("sending");
    const res = await fetch("/api/twilio/send-demo", { method: "POST" });
    setStatus(res.ok ? "sent" : "error");
  }

  return (
    <div className="bg-white rounded-[2.5rem] border border-[#e6e6e6] p-10" style={{ boxShadow: "var(--shadow-card)" }}>
      <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">See it in action</h1>
      <p className="text-neutral-500 text-sm mb-8">
        We&apos;ll send your phone the exact message your customers will receive.
      </p>

      {/* SMS preview */}
      <div className="bg-[#f9f9f9] rounded-2xl p-5 mb-8 border border-[#e6e6e6]">
        <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-3">Preview</p>
        <div className="bg-white rounded-xl p-4 border border-[#e6e6e6] text-sm text-[#1a1a1a] leading-relaxed">
          Hi [Name]! Thanks for choosing [Business]. Mind leaving us a quick Google review?{" "}
          <span className="text-[#fe4a22]">[your link]</span>
        </div>
      </div>

      {status === "sent" ? (
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-sm">
              ✓
            </div>
            <p className="text-sm text-green-800 font-medium">Text sent to your phone. Check it out!</p>
          </div>
          <button
            onClick={() => router.push(`/onboarding/payment?plan=${plan}`)}
            className="bg-[#fe4a22] text-white font-semibold py-3.5 rounded-full hover:opacity-90 transition-opacity"
          >
            Looks good →
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {status === "error" && (
            <p className="text-sm text-red-500">Something went wrong. Check your profile and try again.</p>
          )}
          <button
            onClick={sendDemo}
            disabled={status === "sending"}
            className="bg-[#1a1a1a] text-white font-semibold py-3.5 rounded-full hover:opacity-80 transition-opacity disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send demo text"}
          </button>
          <button
            onClick={() => router.push(`/onboarding/payment?plan=${plan}`)}
            className="text-sm text-neutral-400 hover:text-[#1a1a1a] transition-colors text-center"
          >
            Skip for now
          </button>
        </div>
      )}
    </div>
  );
}

export default function TestPage() {
  return (
    <Suspense>
      <TestForm />
    </Suspense>
  );
}
