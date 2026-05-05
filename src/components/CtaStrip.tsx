export default function CtaStrip() {
  return (
    <section className="bg-[#1a1a1a] py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-8">
          Ready to get more reviews?
        </h2>
        <p className="text-neutral-300 text-lg mb-10">
          Set up in under 5 minutes. No contract, cancel anytime.
        </p>
        <a
          href="/onboarding/account"
          className="inline-block bg-[#fe4a22] text-white font-semibold px-10 py-4 rounded-full hover:opacity-90 transition-opacity text-lg"
        >
          Start free trial
        </a>
      </div>
    </section>
  );
}
