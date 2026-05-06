"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function AccountForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") ?? "growth";

  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (signUpError || !data.user) {
      setError(signUpError?.message ?? "Sign-up failed.");
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from("users").insert({
      id: data.user.id,
      name: form.name,
      phone: form.phone,
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    router.push(`/onboarding/business?plan=${plan}`);
  }

  return (
    <div className="bg-white rounded-[2.5rem] border border-[#e6e6e6] p-10" style={{ boxShadow: "var(--shadow-card)" }}>
      <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">Create your account</h1>
      <p className="text-neutral-500 text-sm mb-8">Start your free trial. No credit card required yet.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#1a1a1a]">Full name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-[#e6e6e6] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#fe4a22] transition-colors"
            placeholder="Jane Smith"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#1a1a1a]">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border border-[#e6e6e6] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#fe4a22] transition-colors"
            placeholder="jane@example.com"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#1a1a1a]">Phone number</label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="border border-[#e6e6e6] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#fe4a22] transition-colors"
            placeholder="+1 555 000 0000"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#1a1a1a]">Password</label>
          <input
            type="password"
            required
            minLength={8}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border border-[#e6e6e6] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#fe4a22] transition-colors"
            placeholder="Min. 8 characters"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-[#fe4a22] text-white font-semibold py-3.5 rounded-full hover:opacity-90 transition-opacity disabled:opacity-60 mt-2"
        >
          {loading ? "Creating account…" : "Continue"}
        </button>
      </form>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense>
      <AccountForm />
    </Suspense>
  );
}
