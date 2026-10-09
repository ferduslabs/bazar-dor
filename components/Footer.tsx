export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-2">🛒 বাজার দর</h3>
            <p className="text-sm opacity-90">
              বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm opacity-90">
              সকল দাম সম্ভাব্য; বাজার অবস্থার উপর নির্ভর করে পরিবর্তিত হয়।
            </p>
            <p className="text-xs opacity-60 mt-2">
              © {new Date().getFullYear()} বাজার দর। সর্বস্বত্ব সংরক্ষিত।
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
