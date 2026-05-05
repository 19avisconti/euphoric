import Star from "./Star";
import { CheckCircle2, MessageCircle, Star as StarIcon } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <CheckCircle2 className="w-5 h-5 text-[#fe4a22]" />,
    title: "Job marked complete",
    description:
      "When you close a job in your workflow, Euphoric automatically queues an SMS to your customer.",
    card: (
      <div className="bg-white border border-[#e6e6e6] rounded-2xl p-5 h-full">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          <span className="text-xs font-medium text-neutral-500">
            Job #2847 marked complete
          </span>
        </div>
        <p className="font-semibold text-[#1a1a1a] text-sm">Water heater install</p>
        <p className="text-neutral-500 text-xs mt-1 mb-4">Mike&apos;s Plumbing · Today 4:28 PM</p>
        <div className="flex items-center gap-2 bg-[#fff3f0] rounded-xl px-3 py-2">
          <MessageCircle className="w-3.5 h-3.5 text-[#fe4a22] flex-shrink-0" />
          <p className="text-xs font-medium text-[#fe4a22]">Review SMS sending in 2 min…</p>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    icon: <MessageCircle className="w-5 h-5 text-[#fe4a22]" />,
    title: "Customer gets a text",
    description:
      "They receive a short, friendly SMS with a link to your branded review page. No app, no account needed.",
    card: (
      <div className="bg-white border border-[#e6e6e6] rounded-2xl p-5 h-full">
        <p className="text-xs font-medium text-neutral-500 mb-3 mt-5">From: Mike&apos;s Plumbing</p>
        <div className="bg-[#f9f9f9] rounded-xl rounded-tl-sm p-3 mb-3">
          <p className="text-sm text-[#1a1a1a] leading-relaxed">
            Hi Sarah! How&apos;d we do today? A quick review means the world to us. 🙏
          </p>
        </div>
        <div className="bg-[#fe4a22] text-white text-xs font-semibold px-4 py-2 rounded-full inline-block">
          Tap to leave a review →
        </div>
      </div>
    ),
  },
  {
    number: "03",
    icon: <StarIcon className="w-5 h-5 text-[#fe4a22]" />,
    title: "One tap to Google",
    description:
      "Your customer lands on a clean page and posts directly to your Google Business profile in seconds.",
    card: (
      <div className="bg-white border border-[#e6e6e6] rounded-2xl p-5 h-full">
        <div className="flex gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="w-5 h-5 text-[#ffd026]" />
          ))}
        </div>
        <p className="text-sm font-semibold text-[#1a1a1a] mb-1">
          &ldquo;Fast, professional, highly recommend!&rdquo;
        </p>
        <p className="text-xs text-neutral-500 mb-4">Sarah K. · just now</p>
        <div className="flex items-center gap-2 bg-[#f0fdf4] rounded-xl px-3 py-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
          <p className="text-xs font-medium text-emerald-700">Posted to Google</p>
        </div>
      </div>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-sm font-semibold text-[#fe4a22] uppercase tracking-widest mb-3">
            How it works
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-tight">
            Three steps.
            <br />
            <span className="text-neutral-300">That&apos;s it.</span>
          </h2>
        </div>

        {/* Grid with 2 explicit rows so descriptions align across columns */}
        <div className="grid md:grid-cols-3 gap-x-8 items-start">
          {/* Row 1: cards with embedded numbers */}
          {steps.map((step) => (
            <div key={`card-${step.number}`} className="pb-5 self-stretch">
              <div className="relative h-full">
                {/* Number embedded near top-right of card */}
                <span className="absolute top-3 right-5 text-5xl font-bold text-[#1a1a1a] leading-none select-none pointer-events-none z-10">
                  {step.number}
                </span>
                {step.card}
              </div>
            </div>
          ))}

          {/* Row 2: titles + descriptions — all start at the same baseline */}
          {steps.map((step) => (
            <div key={`desc-${step.number}`} className="pt-1">
              <div className="flex items-center gap-2 mb-2">
                {step.icon}
                <h3 className="text-base font-semibold text-[#1a1a1a]">
                  {step.title}
                </h3>
              </div>
              <p className="text-neutral-600 leading-relaxed text-sm pl-7">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
