"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const steps = [
  { path: "/onboarding/account", label: "Account" },
  { path: "/onboarding/business", label: "Business" },
  { path: "/onboarding/test", label: "Test" },
  { path: "/onboarding/payment", label: "Payment" },
];

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentStep = steps.findIndex((s) => pathname.startsWith(s.path));
  const progress = currentStep === -1 ? 100 : ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#e6e6e6]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">
          <Link href="/" className="text-xl font-semibold tracking-tight text-[#1a1a1a]">
            euphoric
          </Link>
        </div>
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e6e6e6]">
          <div
            className="h-full bg-[#fe4a22] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </nav>

      <main className="pt-24 pb-16 px-6 flex flex-col items-center">
        <div className={`w-full ${pathname.startsWith("/onboarding/payment") ? "max-w-3xl" : "max-w-xl"}`}>
          {/* Step indicators */}
          {currentStep !== -1 && (
            <div className="flex items-center gap-2 mb-8">
              {steps.map((step, i) => (
                <div key={step.path} className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                      i < currentStep
                        ? "bg-[#fe4a22] text-white"
                        : i === currentStep
                        ? "bg-[#1a1a1a] text-white"
                        : "bg-[#e6e6e6] text-neutral-400"
                    }`}
                  >
                    {i < currentStep ? "✓" : i + 1}
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      i === currentStep ? "text-[#1a1a1a]" : "text-neutral-400"
                    }`}
                  >
                    {step.label}
                  </span>
                  {i < steps.length - 1 && (
                    <div className="w-6 h-px bg-[#e6e6e6] mx-1" />
                  )}
                </div>
              ))}
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}
