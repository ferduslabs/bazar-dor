"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function UpdateInfoPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      toast.error("প্রথমে লগইন করুন");
      router.push("/signin");
      return;
    }
    const user = JSON.parse(storedUser);
    setName(user.name || "");
    setAuthChecked(true);
  }, [router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name) {
      toast.error("নাম ফিল্ড পূরণ করুন");
      return;
    }

    if (name.length < 3) {
      toast.error("নাম কমপক্ষে ৩ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        user.name = name;
        localStorage.setItem("user", JSON.stringify(user));

        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const userIdx = storedUsers.findIndex((u: any) => u.email === user.email);
        if (userIdx >= 0) {
          storedUsers[userIdx].name = name;
          localStorage.setItem("users", JSON.stringify(storedUsers));
        }
      }

      toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
      router.push("/profile");
    }, 800);
  }

  if (!authChecked) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="card bg-base-100 shadow-xl border border-base-300 rounded-xl max-w-md mx-auto">
        <div className="card-body p-6">
          <div className="text-center mb-6">
            <div className="text-5xl mb-2">✏️</div>
            <h1 className="text-2xl font-bold">আপডেট ইনফরমেশন</h1>
            <p className="text-sm text-base-content/60 mt-1">
              আপনার নাম আপডেট করুন
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">নাম</span>
              </label>
              <input
                type="text"
                placeholder="আপনার নতুন নাম"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "আপডেট হচ্ছে..." : "আপডেট ইনফরমেশন"}
            </button>
          </form>

          <Link
            href="/profile"
            className="text-center text-sm text-base-content/60 hover:text-primary mt-4 block"
          >
            ← প্রোফাইলে ফিরে যাও
          </Link>
        </div>
      </div>
    </div>
  );
}
