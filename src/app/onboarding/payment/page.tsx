"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Check } from "lucide-react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const planDetails = {
  standard: {
    name: "Standard",
    monthly: 49,
    features: ["Unlimited SMS", "Google review link", "Opt-out management", "CSV import"],
  },
  growth: {
    name: "Growth",
    monthly: 79,
    features: [
      "Everything in Standard",
      "Review screening (1–3 stars hidden)",
      "Branded review page",
      "Analytics dashboard",
      "Priority support",
    ],
  },
};

const SETUP_FEE = 79;

function CheckoutForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError("");

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/onboarding/success` },
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message ?? "Payment failed.");
      setLoading(false);
    } else {
      onSuccess();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <PaymentElement />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loading || !stripe}
        className="w-full bg-[#fe4a22] text-white font-semibold py-3.5 rounded-full hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {loading ? "Processing…" : "Start subscription"}
      </button>
      <p className="text-xs text-neutral-400 text-center">
        Billed monthly. Cancel anytime.
      </p>
    </form>
  );
}

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [plan, setPlan] = useState<"standard" | "growth">(
    (searchParams.get("plan") as "standard" | "growth") ?? "growth"
  );
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState("");

  const fetchClientSecret = useCallback(async (selectedPlan: "standard" | "growth") => {
    setClientSecret(null);
    setFetchError("");
    const res = await fetch("/api/stripe/create-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: selectedPlan }),
    });
    if (!res.ok) {
      setFetchError("Could not load payment form. Are you logged in?");
      return;
    }
    const { clientSecret: cs } = await res.json();
    setClientSecret(cs);
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchClientSecret(plan); }, [plan, fetchClientSecret]);

  const details = planDetails[plan];

  return (
    <div className="grid md:grid-cols-[1fr_1.1fr] gap-6 items-start">
      {/* Left — plan selector + features */}
      <div
        className="bg-white rounded-[2.5rem] border border-[#e6e6e6] p-8 flex flex-col gap-6"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a1a] mb-1">Choose your plan</h1>
          <p className="text-sm text-neutral-500">Switch anytime, no penalties.</p>
        </div>

        {/* Plan toggle */}
        <div className="grid grid-cols-2 gap-3">
          {(["standard", "growth"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPlan(p)}
              className={`rounded-2xl p-4 text-left border-2 transition-all ${
                plan === p
                  ? "border-[#fe4a22] bg-[#fff3f0]"
                  : "border-[#e6e6e6] hover:border-neutral-300"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-1">
                {planDetails[p].name}
              </p>
              <p className="text-2xl font-bold text-[#1a1a1a]">
                ${planDetails[p].monthly}
                <span className="text-sm font-normal text-neutral-400">/mo</span>
              </p>
            </button>
          ))}
        </div>

        {/* Features */}
        <ul className="flex flex-col gap-2.5">
          {details.features.map((f) => (
            <li key={f} className="flex items-center gap-3 text-sm">
              <div className="w-5 h-5 rounded-full bg-[#fff3f0] border border-[#ffd5cc] flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-[#fe4a22]" strokeWidth={2.5} />
              </div>
              <span className="text-[#1a1a1a]">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right — cost breakdown + payment form */}
      <div
        className="bg-white rounded-[2.5rem] border border-[#e6e6e6] p-8 flex flex-col gap-6"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        {/* Order summary */}
        <div>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-5">Order summary</h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600">{details.name} plan</span>
              <span className="font-semibold text-[#1a1a1a]">${details.monthly}/mo</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600">One-time setup fee</span>
              <span className="font-semibold text-[#1a1a1a]">${SETUP_FEE}</span>
            </div>
            <div className="h-px bg-[#e6e6e6]" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[#1a1a1a]">Due today</span>
              <span className="text-xl font-bold text-[#1a1a1a]">
                ${details.monthly + SETUP_FEE}
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Then ${details.monthly}/mo. Cancel anytime.
            </p>
          </div>
        </div>

        <div className="h-px bg-[#e6e6e6]" />

        {/* Payment form */}
        {fetchError && <p className="text-sm text-red-500">{fetchError}</p>}
        {clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm onSuccess={() => router.push("/onboarding/success")} />
          </Elements>
        ) : !fetchError ? (
          <div className="h-32 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full border-2 border-[#fe4a22] border-t-transparent animate-spin" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense>
      <PaymentContent />
    </Suspense>
  );
}
