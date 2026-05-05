import {
  Wrench,
  Thermometer,
  Zap,
  Leaf,
  Home,
  Bug,
  Waves,
  Paintbrush,
  Hammer,
  Car,
  Wind,
  Fence,
  Droplets,
  Flame,
  Camera,
  Scissors,
  Truck,
  ShieldCheck,
  TreePine,
  Sofa,
} from "lucide-react";

const row1 = [
  { label: "Plumbers", icon: Wrench },
  { label: "HVAC Techs", icon: Thermometer },
  { label: "Electricians", icon: Zap },
  { label: "Landscapers", icon: Leaf },
  { label: "Roofers", icon: Home },
  { label: "Pest Control", icon: Bug },
  { label: "Pool Service", icon: Waves },
];

const row2 = [
  { label: "Painters", icon: Paintbrush },
  { label: "Handymen", icon: Hammer },
  { label: "Auto Detailers", icon: Car },
  { label: "Fence Installers", icon: Fence },
  { label: "Pressure Washers", icon: Droplets },
  { label: "Fireplace Techs", icon: Flame },
  { label: "Home Inspectors", icon: Camera },
];

const row3 = [
  { label: "Tree Services", icon: TreePine },
  { label: "Gutter Cleaners", icon: Wind },
  { label: "Junk Removal", icon: Truck },
  { label: "Window Cleaners", icon: ShieldCheck },
  { label: "Lawn Care", icon: Scissors },
  { label: "Carpet Cleaners", icon: Sofa },
  { label: "Appliance Repair", icon: Wrench },
];

const stats = [
  { value: "4.9", label: "avg. rating earned", stars: true },
  { value: "12k+", label: "reviews generated", stars: false },
  { value: "94%", label: "SMS open rate", stars: false },
];

function Pill({ label, icon: Icon }: { label: string; icon: React.ElementType }) {
  return (
    <div className="flex items-center gap-2.5 bg-white border border-[#e6e6e6] rounded-full px-5 py-3 whitespace-nowrap flex-shrink-0">
      <Icon className="w-4 h-4 text-[#fe4a22] flex-shrink-0" />
      <span className="text-sm font-semibold text-[#1a1a1a]">{label}</span>
    </div>
  );
}

function MarqueeRow({
  items,
  duration,
  reverse = false,
}: {
  items: typeof row1;
  duration: number;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className="flex gap-3 w-max"
        style={{
          animation: `marquee ${duration}s linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        {doubled.map((item, i) => (
          <Pill key={i} label={item.label} icon={item.icon} />
        ))}
      </div>
    </div>
  );
}

export default function SocialProof() {
  return (
    <section className="py-10 border-y border-[#e6e6e6] overflow-hidden bg-[#f9f9f9]">
      {/* Hidden SVG gradient definition — referenced by star fills below */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="star-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fe4a22" />
            <stop offset="100%" stopColor="#ffd026" />
          </linearGradient>
        </defs>
      </svg>

      {/* Stats row */}
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <div className="grid grid-cols-3 divide-x divide-[#e6e6e6]">
          {stats.map((s) => (
            <div key={s.label} className="text-center px-8">
              <p className="text-8xl font-bold leading-none mb-3 bg-gradient-to-r from-[#fe4a22] to-[#ffd026] bg-clip-text text-transparent">
                {s.value}
              </p>
              {s.stars && (
                <div className="flex justify-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
                      <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                        fill="url(#star-grad)"
                      />
                    </svg>
                  ))}
                </div>
              )}
              <p className="text-xl font-semibold text-neutral-600">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Label */}
      <p className="text-center text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-8">
        Trusted by service businesses everywhere
      </p>

      {/* Three marquee rows */}
      <div className="flex flex-col gap-3">
        <MarqueeRow items={row1} duration={28} />
        <MarqueeRow items={row2} duration={34} reverse />
        <MarqueeRow items={row3} duration={22} />
      </div>
    </section>
  );
}
