import Link from "next/link";
import React from "react";

export default function VerifyEmail() {
  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="mx-auto p-16 bg-white rounded-2xl flex flex-col items-center justify-center gap-6">
        <p className="text-3xl font-bold text-pink-800"> Verify Email</p>
        <p className="text-neutral-600">
          A sign in link has been sent to your email address.
        </p>

        <Link href="/shop">
          <button
            className="text-white bg-pink-700 rounded-xl p-3 px-8 cursor-pointer"
            type="button"
          >
            I have verified
          </button>
        </Link>
      </div>
    </div>
  );
}
