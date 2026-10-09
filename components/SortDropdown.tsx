"use client";

import { useState } from "react";

export type SortOption = "default" | "low-to-high" | "high-to-low";

export default function SortDropdown({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (value: SortOption) => void;
}) {
  const [open, setOpen] = useState(false);

  const options: { value: SortOption; label: string }[] = [
    { value: "default", label: "ডিফল্ট" },
    { value: "low-to-high", label: "দাম: কম থেকে বেশি" },
    { value: "high-to-low", label: "দাম: বেশি থেকে কম" },
  ];

  const currentLabel = options.find((o) => o.value === value)?.label || "ডিফল্ট";

  return (
    <div className="relative">
      <button
        className="btn btn-sm btn-outline gap-2"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm">সাজান:</span>
        <span className="font-medium">{currentLabel}</span>
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>▼</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 z-20 bg-base-100 rounded-lg shadow-lg border border-base-300 min-w-[200px]">
            {options.map((option) => (
              <button
                key={option.value}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-base-200 transition-colors ${
                  value === option.value ? "bg-primary/10 text-primary font-medium" : ""
                }`}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
