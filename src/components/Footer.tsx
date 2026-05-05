export default function Footer() {
  return (
    <footer className="border-t border-[#e6e6e6] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-[#1a1a1a]">euphoric</p>
          <p className="text-xs text-neutral-400 mt-0.5">
            SMS review automation for service businesses
          </p>
        </div>

        <div className="flex items-center gap-6 text-sm text-neutral-400">
          <a href="#" className="hover:text-[#1a1a1a] transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-[#1a1a1a] transition-colors">
            Terms
          </a>
          <span>&copy; 2026 Euphoric Inc.</span>
        </div>
      </div>
    </footer>
  );
}
