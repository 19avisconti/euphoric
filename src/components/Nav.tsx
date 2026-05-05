export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#e6e6e6]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-xl font-semibold tracking-tight text-[#1a1a1a]">
          euphoric
        </span>

        <div className="hidden md:flex items-center gap-6">
          <a
            href="#how-it-works"
            className="text-sm text-neutral-500 hover:text-[#1a1a1a] transition-colors"
          >
            How it works
          </a>
          <a
            href="#pricing"
            className="text-sm text-neutral-500 hover:text-[#1a1a1a] transition-colors"
          >
            Pricing
          </a>
          <a
            href="/onboarding/account"
            className="bg-[#fe4a22] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
          >
            Start free trial
          </a>
        </div>
      </div>
    </nav>
  );
}
