import React from "react";

import prisma from "@/lib/prisma";

export default async function ShopPage() {
  const users = await prisma.user.findMany();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Shop
      </h1>
      {users && (
        <ul className="font-[family-name:var(--font-geist-sans)] flex flex-col gap-y-4">
          {users.map((user, index) => {
            return (
              <li
                key={user.id}
                className="block p-4 shadow-sm border border-gray-200 rounded-xl text-gray-500"
              >
                <span className="">{index + 1}. </span>
                <span className="text-sm">{user.email}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
