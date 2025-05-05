import { Prisma } from "@/generated/prisma";
import { getUserFromSession } from "@/lib/actions/user-actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useUser() {
  const { status, data } = useSession();

  const router = useRouter();
  const [user, setUser] = useState<Prisma.UserCreateInput | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  // Get loggedin user data from session
  useEffect(() => {
    const getUserDataFromSession = async () => {
      try {
        if (status === "loading") return;

        const userExists = await getUserFromSession(data.id as string);
        if (!userExists) router.replace("/");

        setUser(userExists);
      } catch (error) {
        console.error("error -> ", error);
        console.log("error name -> ", error?.name);
        router.replace("/");

        // TODO''' Check error type

        // TODO''' If session exists but account does not exist, redirect to verify-email page
      } finally {
        setIsAuthenticating(false);
      }
    };

    getUserDataFromSession();
  }, [data, status, router]);

  return {
    user,
    loading: isAuthenticating || status === "loading",
  };
}
