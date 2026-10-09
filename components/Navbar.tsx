"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getBengaliDate } from "@/lib/bengali";
import { Category } from "@/lib/api";

export default function Navbar() {
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [bengaliDate, setBengaliDate] = useState("");

  useEffect(() => {
    setBengaliDate(getBengaliDate());
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUserName(user.name || user.email || "ইউজার");
    }

    async function fetchCategories() {
      try {
        const { getAllCategories } = await import("@/lib/api");
        const cats = await getAllCategories();
        setCategories(cats);
      } catch (err) {
        setCategories([
          { id: 1, name: "চাল", slug: "chal", emoji: "🍚" },
          { id: 2, name: "ডাল", slug: "dal", emoji: "🫘" },
          { id: 3, name: "তেল", slug: "oil", emoji: "🫙" },
          { id: 4, name: "সবজি", slug: "vegetables", emoji: "🥔" },
          { id: 5, name: "মাছ", slug: "fish", emoji: "🐟" },
          { id: 6, name: "মুরগি", slug: "chicken", emoji: "🍗" },
          { id: 7, name: "মসলা", slug: "spices", emoji: "🌶️" },
          { id: 8, name: "ফল", slug: "fruits", emoji: "🍌" },
        ]);
      }
    }
    fetchCategories();
  }, [pathname]);

  function handleLogout() {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("");
    window.location.href = "/";
  }

  function isActive(slug: string): boolean {
    return pathname === `/category/${slug}`;
  }

  return (
    <nav className="sticky top-0 z-50 bg-base-100 shadow-md">
      <div className="bg-primary text-primary-content">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🛒</span>
              <div>
                <h1 className="text-lg font-bold leading-tight">বাজার দর</h1>
                <p className="text-xs opacity-90">{bengaliDate}</p>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link href="/profile" className="btn btn-sm btn-ghost text-primary-content">
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-8">
                      <span className="text-xs">{userName.charAt(0).toUpperCase()}</span>
                    </div>
                  </div>
                  {userName}
                </Link>
                <button onClick={handleLogout} className="btn btn-sm btn-outline btn-secondary">
                  সাইন আউট
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/signin" className="btn btn-sm btn-ghost text-primary-content">
                  সাইন ইন
                </Link>
                <Link href="/signup" className="btn btn-sm btn-secondary">
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button
              className="btn btn-sm btn-ghost text-primary-content"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-base-200 border-b border-base-300">
        <div className="max-w-6xl mx-auto px-4">
          <div className="hidden md:flex items-center gap-1 py-2 overflow-x-auto">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`px-3 py-1 rounded-md text-sm whitespace-nowrap transition-colors ${
                  isActive(cat.slug)
                    ? "bg-primary text-primary-content font-semibold"
                    : "text-base-content hover:bg-base-300"
                }`}
              >
                <span className="mr-1">{cat.emoji || "📦"}</span>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-base-100 border-b border-base-300 shadow-lg">
          <div className="px-4 py-3 space-y-2">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    isActive(cat.slug) ? "bg-primary text-primary-content" : "bg-base-200"
                  }`}
                >
                  {cat.emoji || "📦"} {cat.name}
                </Link>
              ))}
            </div>
            <div className="pt-2 border-t border-base-300">
              {isLoggedIn ? (
                <div className="flex gap-2">
                  <Link href="/profile" onClick={() => setMenuOpen(false)} className="btn btn-sm btn-ghost flex-1">
                    {userName}
                  </Link>
                  <button onClick={handleLogout} className="btn btn-sm btn-outline btn-error flex-1">
                    সাইন আউট
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link href="/signin" onClick={() => setMenuOpen(false)} className="btn btn-sm btn-ghost flex-1">
                    সাইন ইন
                  </Link>
                  <Link href="/signup" onClick={() => setMenuOpen(false)} className="btn btn-sm btn-primary flex-1">
                    সাইন আপ
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
