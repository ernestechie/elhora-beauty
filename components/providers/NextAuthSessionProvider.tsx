"use client";

import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

export default function NextAuthSessionProvider(props: PropsWithChildren) {
  const { children } = props;

  return <SessionProvider>{children}</SessionProvider>;
}
