import { Check } from "lucide-react";

const plans = [
  {
    name: "Standard",
    price: "$49",
    period: "/mo",
    setup: "$79 one-time setup",
    description: "Everything you need to start collecting 5-star reviews.",
    features: [
      "Unlimited SMS",
      "Google review link",
      "Opt-out management",
      "CSV import",
    ],
    highlighted: false,
    href: "/onboarding/account?plan=standard",
  },
  {
    name: "Growth",
    price: "$79",
    period: "/mo",
    setup: "$79 one-time setup",
    description: "For businesses serious about their Google reputation.",
    features: [
      "Unlimited SMS",
      "Review screening (1–3 stars hidden)",
      "Branded review page",
      "Analytics dashboard",
      "Priority support",
    ],
    highlighted: true,
    href: "/onboarding/account?plan=growth",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <p className="text-sm font-semibold text-[#fe4a22] uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-tight">
            Flat-rate.
            <br />
            <span className="text-neutral-300">No per-SMS anxiety.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-[2.5rem] p-8 flex flex-col gap-6 ${
                plan.highlighted
                  ? "bg-white border-2 border-[#fe4a22] shadow-[0_2rem_40px_-2rem_rgba(254,74,34,0.18)]"
                  : "bg-white border border-[#e6e6e6]"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-[#fe4a22] text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                    Most popular
                  </span>
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-neutral-500 mb-1 uppercase tracking-wide">
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-[#1a1a1a]">
                    {plan.price}
                  </span>
                  <span className="text-neutral-400 text-sm">{plan.period}</span>
                </div>
                <p className="text-xs text-neutral-400 mt-1">{plan.setup}</p>
                <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <ul className="flex flex-col gap-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      plan.highlighted
                        ? "bg-[#fff3f0] border border-[#ffd5cc]"
                        : "bg-[#f9f9f9] border border-[#e6e6e6]"
                    }`}>
                      <Check className="w-3 h-3 text-[#fe4a22]" strokeWidth={2.5} />
                    </div>
                    <span className="text-[#1a1a1a]">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                className={`text-center font-semibold py-3.5 rounded-full transition-opacity hover:opacity-90 ${
                  plan.highlighted
                    ? "bg-[#fe4a22] text-white"
                    : "bg-[#f9f9f9] text-[#1a1a1a] border border-[#e6e6e6] hover:border-neutral-300"
                }`}
              >
                Start free trial
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
