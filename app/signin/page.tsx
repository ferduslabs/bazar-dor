"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("সকল ফিল্ড পূরণ করুন");
      return;
    }

    if (!email.includes("@")) {
      toast.error("সঠিক ইমেইল দিন");
      return;
    }

    if (password.length < 6) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const user = storedUsers.find(
        (u: any) => u.email === email && u.password === password
      );

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("সফলভাবে লগইন হয়েছে");
        router.push("/");
      } else {
        toast.error("ভুল ইমেইল বা পাসওয়ার্ড");
        setLoading(false);
      }
    }, 800);
  }

  function handleSocialLogin(provider: string) {
    setLoading(true);
    toast(`${provider} দিয়ে লগইন হচ্ছে...`, { icon: "⏳" });

    setTimeout(() => {
      const user = {
        name: provider === "Google" ? "Google ইউজার" : "GitHub ইউজার",
        email: `user@${provider.toLowerCase()}.com`,
        provider: provider,
      };
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("সফলভাবে লগইন হয়েছে");
      router.push("/");
    }, 1000);
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-8">
      <div className="card bg-base-100 shadow-xl border border-base-300 rounded-xl w-full max-w-md">
        <div className="card-body p-6">
          <div className="text-center mb-6">
            <div className="text-5xl mb-2">🔐</div>
            <h1 className="text-2xl font-bold">সাইন ইন</h1>
            <p className="text-sm text-base-content/60 mt-1">
              আপনার একাউন্টে লগইন করুন
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">ইমেইল</span>
              </label>
              <input
                type="email"
                placeholder="আপনার ইমেইল"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">পাসওয়ার্ড</span>
              </label>
              <input
                type="password"
                placeholder="আপনার পাসওয়ার্ড"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "লগইন হচ্ছে..." : "লগইন করুন"}
            </button>
          </form>

          <div className="divider text-base-content/40 text-sm">অথবা</div>

          <div className="space-y-2">
            <button
              onClick={() => handleSocialLogin("Google")}
              className="btn btn-outline w-full gap-2"
              disabled={loading}
            >
              <span className="text-lg">🔵</span>
              Google দিয়ে লগইন
            </button>
            <button
              onClick={() => handleSocialLogin("GitHub")}
              className="btn btn-outline w-full gap-2"
              disabled={loading}
            >
              <span className="text-lg">🐙</span>
              GitHub দিয়ে লগইন
            </button>
          </div>

          <p className="text-center text-sm mt-4 text-base-content/60">
            নতুন একাউন্ট?{" "}
            <Link href="/signup" className="text-primary font-medium hover:underline">
              নিবন্ধন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
