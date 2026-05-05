import Star from "./Star";
import { TrendingUp, MessageSquare } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-20 pb-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <div>
            <h1 className="hero-headline font-bold text-[#1a1a1a] mb-6">
              More 5-star{" "}
              <span className="text-[#fe4a22]">reviews.</span>
              <br />
              <span className="text-[#1a1a1a]">Zero extra work.</span>
            </h1>

            <p className="text-xl text-neutral-600 leading-relaxed mb-10 max-w-md">
              We text your customers right after the job, and you rank higher on Google.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#pricing"
                className="bg-[#fe4a22] text-white font-semibold px-7 py-4 rounded-full hover:opacity-90 transition-opacity"
              >
                Start free trial
              </a>
              <a
                href="#how-it-works"
                className="bg-[#f9f9f9] text-[#1a1a1a] font-semibold px-7 py-4 rounded-full border border-[#e6e6e6] hover:border-neutral-300 transition-colors"
              >
                See how it works
              </a>
            </div>
          </div>

          {/* Right column — phone mockup + floating cards */}
          <div className="relative flex justify-center lg:justify-end pt-8 pb-20 pr-4 lg:pr-16">
            <div className="relative">
              {/* Phone shell */}
              <div className="w-80 bg-[#1a1a1a] rounded-[3rem] p-3.5 shadow-[0_4rem_80px_-4rem_rgba(0,0,0,0.40)]">
                {/* Notch */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#1a1a1a] rounded-full z-10" />

                <div className="bg-white h-[600px] rounded-[2.5rem] overflow-hidden p-5 flex flex-col gap-4 pt-8">
                  {/* Status bar */}
                  <div className="flex justify-between items-center text-xs text-neutral-400 font-semibold mt-1">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-3.5 h-2 border border-current rounded-sm relative">
                        <div className="absolute inset-0.5 right-auto w-1.5 bg-current rounded-sm" />
                      </div>
                    </div>
                  </div>

                  {/* App header */}
                  <div className="flex items-center gap-3 border-b border-[#e6e6e6] pb-4">
                    <div className="w-9 h-9 rounded-full bg-[#fe4a22] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      MP
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#1a1a1a]">
                        Mike&apos;s Plumbing
                      </p>
                      <p className="text-[10px] text-neutral-400">
                        Today at 4:32 PM
                      </p>
                    </div>
                  </div>

                  {/* SMS bubble */}
                  <div className="bg-[#f9f9f9] rounded-2xl rounded-tl-sm p-4">
                    <p className="text-sm text-[#1a1a1a] leading-relaxed">
                      Hi Sarah! Thanks for choosing us today. How&apos;d we do?
                      Mind leaving a quick Google review?
                    </p>
                    <div className="mt-4">
                      <div className="bg-white border border-[#e6e6e6] rounded-2xl p-3 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#fff3f0] border border-[#ffd5cc] flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="w-4 h-4 text-[#fe4a22]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-[#1a1a1a] truncate">
                            Leave a Google Review
                          </p>
                          <p className="text-[10px] text-neutral-400">
                            euphoric.link/mp-sarah
                          </p>
                        </div>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="w-4 h-4 text-neutral-300 flex-shrink-0"
                        >
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Star rating card */}
                  <div className="bg-white border border-[#e6e6e6] rounded-2xl p-4 mt-20">
                    <p className="text-xs font-semibold text-[#1a1a1a] mb-1">
                      Mike&apos;s Plumbing
                    </p>
                    <p className="text-[10px] text-neutral-500 mb-3">
                      How would you rate your experience?
                    </p>
                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-7 h-7 text-[#ffd026]" />
                      ))}
                    </div>
                    <div className="bg-[#1a1a1a] text-white text-xs font-semibold text-center py-2.5 rounded-xl">
                      Post to Google
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating card — new review */}
              <div className="absolute -right-4 lg:-right-20 top-1 bg-white border border-[#e6e6e6] rounded-2xl p-4 w-56 shadow-[0_1rem_32px_-4px_rgba(0,0,0,0.12)] z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#f9f9f9] border border-[#e6e6e6] flex items-center justify-center flex-shrink-0 text-xs font-bold text-neutral-500">
                    SK
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#1a1a1a]">Sarah K.</p>
                    <p className="text-[10px] text-neutral-400">Just now</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 text-[#ffd026]" />
                  ))}
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  &ldquo;Super fast and professional. Will definitely call again!&rdquo;
                </p>
              </div>

              {/* Floating card — stats */}
              <div className="absolute -left-4 lg:-left-30 bottom-40 bg-white border border-[#e6e6e6] rounded-2xl p-4 w-48 shadow-[0_1rem_32px_-4px_rgba(0,0,0,0.12)]">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest">
                    This month
                  </p>
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <p className="text-3xl font-bold text-[#1a1a1a] leading-none mb-1">
                  +24
                </p>
                <p className="text-xs font-medium text-[#1a1a1a] mb-3">
                  Google reviews
                </p>
                {/* Mini bar chart */}
                <div className="flex items-end gap-1 h-8">
                  {[3, 5, 4, 6, 5, 7, 9].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-[#fe4a22] opacity-80"
                      style={{ height: `${(h / 9) * 100}%` }}
                    />
                  ))}
                </div>
                <p className="text-[10px] text-emerald-600 font-semibold mt-2">
                  +62% vs last month
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
