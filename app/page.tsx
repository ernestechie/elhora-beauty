import prisma from "@/lib/prisma";

export default async function Home() {
  const usersQueryVariables = {
    where: {
      id: {
        gte: 2,
      },
    },
  };
  const users = await prisma.user.findMany();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Home
      </h1>
      {users && (
        <ul className="font-[family-name:var(--font-geist-sans)] flex flex-col gap-y-4">
          {users.map((user) => {
            return (
              <li
                key={user.id}
                className="mb-2 block p-4 shadow-lg border border-gray-200 rounded-xl"
              >
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">User {user.id}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
