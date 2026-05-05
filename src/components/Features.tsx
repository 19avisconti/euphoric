import { ShieldCheck, Clock, UserX, Plug } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="w-5 h-5 text-[#fe4a22]" />,
    title: "FTC-compliant by design",
    description:
      "We never ask for or filter reviews. Every customer gets the same message, every time — no cherry-picking.",
  },
  {
    icon: <Clock className="w-5 h-5 text-[#fe4a22]" />,
    title: "TCPA quiet hours enforced",
    description:
      "Messages only send between 8 AM and 9 PM in your customer's local timezone. Always.",
  },
  {
    icon: <UserX className="w-5 h-5 text-[#fe4a22]" />,
    title: "Opt-out handled automatically",
    description:
      "Customers reply STOP and we remove them instantly. They'll never hear from you again unless they opt back in.",
  },
  {
    icon: <Plug className="w-5 h-5 text-[#fe4a22]" />,
    title: "Works with Square & CSV",
    description:
      "Connect Square in one click, or drop in a CSV after any job. No complex integrations required.",
  },
];

export default function Features() {
  return (
    <section className="py-24 px-6 bg-[#f9f9f9]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-tight">
            Everything you need.
            <br />
            <span className="text-neutral-300">Nothing you don&apos;t.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white border border-[#e6e6e6] rounded-[2.5rem] p-8 flex flex-col gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[#fff3f0] border border-[#ffd5cc] flex items-center justify-center flex-shrink-0">
                {f.icon}
              </div>
              <h3 className="font-semibold text-[#1a1a1a] leading-snug">
                {f.title}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
