"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { createClient } from "@/lib/supabase/client";

const tradeTypes = [
  "HVAC",
  "Plumbing",
  "Electrical",
  "Landscaping",
  "Cleaning",
  "Roofing",
  "Painting",
  "Pest Control",
  "Other",
];

export default function BusinessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") ?? "growth";

  const inputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    name: "",
    trade_type: "",
    service_area: "",
    google_review_url: "",
  });
  const [placeSelected, setPlaceSelected] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!inputRef.current) return;

    setOptions({ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY! });

    importLibrary("places").then((placesLib) => {
      const { Autocomplete } = placesLib as google.maps.PlacesLibrary;
      if (!inputRef.current) return;

      const autocomplete = new Autocomplete(inputRef.current, {
        types: ["establishment"],
        fields: ["name", "place_id", "formatted_address", "address_components"],
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.place_id) return;

        // Extract city/state from address components for service_area
        const components = place.address_components ?? [];
        const locality =
          components.find((c: google.maps.GeocoderAddressComponent) =>
            c.types.includes("locality")
          )?.long_name ?? "";
        const state =
          components.find((c: google.maps.GeocoderAddressComponent) =>
            c.types.includes("administrative_area_level_1")
          )?.short_name ?? "";
        const serviceArea = [locality, state].filter(Boolean).join(", ");

        setForm((prev) => ({
          ...prev,
          name: place.name ?? "",
          service_area: serviceArea || prev.service_area,
          google_review_url: `https://search.google.com/local/writereview?placeid=${place.place_id}`,
        }));
        setPlaceSelected(true);
      });
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Session expired. Please sign in again.");
      setLoading(false);
      return;
    }

    const { error: upsertError } = await supabase.from("businesses").upsert({
      user_id: user.id,
      ...form,
    });

    if (upsertError) {
      setError(upsertError.message);
      setLoading(false);
      return;
    }

    router.push(`/onboarding/test?plan=${plan}`);
  }

  return (
    <div
      className="bg-white rounded-[2.5rem] border border-[#e6e6e6] p-10"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">
        Tell us about your business
      </h1>
      <p className="text-neutral-500 text-sm mb-8">
        This helps us personalise your review messages.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Business name — Google Places Autocomplete */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#1a1a1a]">
            Find your business on Google
          </label>
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              required
              defaultValue={form.name}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, name: e.target.value }));
                setPlaceSelected(false);
              }}
              className="w-full border border-[#e6e6e6] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#fe4a22] transition-colors"
              placeholder="Search your business name…"
            />
            {placeSelected && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-green-100 border border-green-200 flex items-center justify-center text-green-600 text-xs font-bold">
                ✓
              </div>
            )}
          </div>
          <p className="text-xs text-neutral-400">
            Select your listing from the dropdown — we&apos;ll auto-fill your Google review link.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#1a1a1a]">Trade type</label>
          <select
            required
            value={form.trade_type}
            onChange={(e) => setForm({ ...form, trade_type: e.target.value })}
            className="border border-[#e6e6e6] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#fe4a22] transition-colors bg-white"
          >
            <option value="">Select your trade</option>
            {tradeTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#1a1a1a]">Service area</label>
          <input
            type="text"
            required
            value={form.service_area}
            onChange={(e) => setForm({ ...form, service_area: e.target.value })}
            className="border border-[#e6e6e6] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#fe4a22] transition-colors"
            placeholder="Austin, TX"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#1a1a1a]">Google review link</label>
          <input
            type="url"
            required
            value={form.google_review_url}
            onChange={(e) => setForm({ ...form, google_review_url: e.target.value })}
            className="border border-[#e6e6e6] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#fe4a22] transition-colors"
            placeholder="Auto-filled when you select your listing"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-[#fe4a22] text-white font-semibold py-3.5 rounded-full hover:opacity-90 transition-opacity disabled:opacity-60 mt-2"
        >
          {loading ? "Saving…" : "Continue"}
        </button>
      </form>
    </div>
  );
}
