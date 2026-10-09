export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary/10 via-base-100 to-base-200 py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-primary mb-2">🆕 আজকের বাজার দর</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              বাজার দর এক নজরে
            </h2>
            <p className="text-base-content/70 text-lg mb-6">
              প্রয়োজনীয় পণ্যের বর্তমান দাম, দাম বৃদ্ধি বা হ্রাস — সব এক জায়গায়।
              বাজারের সর্বশেষ দাম দেখে কেনাকাটা করুন সহজ এবং সাশ্রয়ী।
            </p>
            <a href="#সব-পণ্য" className="btn btn-primary btn-md sm:btn-lg">
              সব পণ্য দেখো
            </a>
          </div>

          <div className="flex justify-center">
            <div className="text-9xl md:text-[12rem]">
              🛒
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
