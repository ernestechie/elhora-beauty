"use client";

import useUser from "@/hooks/useUser";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

interface ShopLayoutProps {
  children?: React.ReactNode;
}

export default function ShopLayout({ children }: ShopLayoutProps) {
  const router = useRouter();
  const { loading, user } = useUser();

  console.log("User -> ", user);

  // Handle user logout
  const logoutUser = async () => {
    await signOut().then(() => router.replace("/"));
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <i className="pi pi-spin pi-spinner text-4xl animate-spin" />
        <p className="text-neutral-500">
          Please wait, we are preparing things for you...
        </p>
      </div>
    );

  return (
    <div>
      {user && (
        <nav className="w-screen fixed top-0 left-0 right-0 p-4 border-b border-b-neutral-200 flex items-center justify-between">
          <div>
            <p className="text-2xl text-pink-900 font-medium">Elhora Beauty</p>
            <p className="text-neutral-500">Welcome, {user.name}</p>
          </div>

          <button
            onClick={logoutUser}
            className="bg-pink-900 rounded-xl cursor-pointer size-10"
            type="button"
          >
            <i className="text-white pi-sign-out pi" />
          </button>
        </nav>
      )}
      {children}
    </div>
  );
}
