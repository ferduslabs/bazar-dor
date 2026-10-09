"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string; provider?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      toast.error("প্রথমে লগইন করুন");
      router.push("/signin");
      return;
    }
    setUser(JSON.parse(storedUser));
    setLoading(false);
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("user");
    toast.success("সফলভাবে লগআউট হয়েছে");
    router.push("/");
  }

  if (loading || !user) {
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
      <div className="card bg-base-100 shadow-xl border border-base-300 rounded-xl max-w-2xl mx-auto">
        <div className="card-body p-6">
          <div className="text-center mb-6">
            <div className="avatar placeholder mb-3">
              <div className="bg-primary text-primary-content rounded-full w-20">
                <span className="text-3xl">{user.name.charAt(0).toUpperCase()}</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-base-content/60 text-sm">{user.email}</p>
            {user.provider && (
              <span className="badge badge-sm badge-secondary mt-2">
                {user.provider} দিয়ে লগইন
              </span>
            )}
          </div>

          <div className="bg-base-200 rounded-lg p-4 mb-4">
            <h2 className="text-sm font-semibold text-base-content/70 mb-2">প্রোফাইল তথ্য</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-base-content/60">নাম:</span>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-base-content/60">ইমেইল:</span>
                <span className="text-sm font-medium">{user.email}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Link href="/update-info" className="btn btn-primary flex-1">
              ✏️ আপডেট
            </Link>
            <button onClick={handleLogout} className="btn btn-outline btn-error flex-1">
              সাইন আউট
            </button>
          </div>

          <Link href="/" className="text-center text-sm text-base-content/60 hover:text-primary mt-4 block">
            ← হোমে ফিরে যাও
          </Link>
        </div>
      </div>
    </div>
  );
}
