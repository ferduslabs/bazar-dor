import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-4">🔍</div>
        <h1 className="text-6xl font-bold text-primary mb-2">৪০৪</h1>
        <h2 className="text-2xl font-semibold mb-4">পৃষ্ঠাটি খুঁজে পাওয়া যায়নি</h2>
        <p className="text-base-content/60 mb-8 max-w-md mx-auto">
          দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি খুঁজে পাওয়া যায়নি।
          হয়তো পৃষ্ঠাটি সরিয়ে ফেলা হয়েছে অথবা লিঙ্কটি ভুল।
        </p>
        <Link href="/" className="btn btn-primary btn-md">
          হোম পেজে ফিরে যাও
        </Link>
      </div>
    </div>
  );
}
