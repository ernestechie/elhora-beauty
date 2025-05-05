import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Home Page
      </h1>

      <Link href="/auth">
        <button
          className="text-white bg-pink-700 rounded-xl p-3 px-8 cursor-pointer"
          type="button"
        >
          Get started
        </button>
      </Link>
    </div>
  );
}
