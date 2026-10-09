"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("সকল ফিল্ড পূরণ করুন");
      return;
    }

    if (name.length < 3) {
      toast.error("নাম কমপক্ষে ৩ অক্ষরের হতে হবে");
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
      const existingUser = storedUsers.find((u: any) => u.email === email);

      if (existingUser) {
        toast.error("এই ইমেইল দিয়ে ইতিমধ্যে নিবন্ধন করা আছে");
        setLoading(false);
        return;
      }

      const newUser = { name, email, password };
      storedUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(storedUsers));
      toast.success("নিবন্ধন সফল হয়েছে");
      router.push("/signin");
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
            <div className="text-5xl mb-2">📝</div>
            <h1 className="text-2xl font-bold">সাইন আপ</h1>
            <p className="text-sm text-base-content/60 mt-1">
              নতুন একাউন্ট তৈরি করুন
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">নাম</span>
              </label>
              <input
                type="text"
                placeholder="আপনার নাম"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
                placeholder="কমপক্ষে ৬ অক্ষর"
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
              {loading ? "নিবন্ধন হচ্ছে..." : "নিবন্ধন করুন"}
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
              Google দিয়ে সাইন আপ
            </button>
            <button
              onClick={() => handleSocialLogin("GitHub")}
              className="btn btn-outline w-full gap-2"
              disabled={loading}
            >
              <span className="text-lg">🐙</span>
              GitHub দিয়ে সাইন আপ
            </button>
          </div>

          <p className="text-center text-sm mt-4 text-base-content/60">
            ইতিমধ্যে একাউন্ট আছে?{" "}
            <Link href="/signin" className="text-primary font-medium hover:underline">
              লগইন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
