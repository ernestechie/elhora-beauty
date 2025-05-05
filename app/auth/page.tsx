"use client";

import {
  emailRegistrationSchema,
  EmailRegistrationSchemaType,
} from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, register, reset } =
    useForm<EmailRegistrationSchemaType>({
      resolver: zodResolver(emailRegistrationSchema),
      defaultValues: {
        email: "",
      },
    });

  //
  const onSubmit = async (values: EmailRegistrationSchemaType) => {
    try {
      setIsLoading(true);

      const response = await signIn("email", {
        email: values.email,
        callbackUrl: "/shop", // <- Set the redirect URL here
        // redirect: false,
      });

      console.log("response -> ", response);
      reset();
    } catch (error) {
      console.log("error -> ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form
        className="p-8 mx-auto flex flex-col gap-4 max-w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-xl mb-4 font-bold">Login</p>
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          id="email"
          required
          className="p-3 border border-gray-300 outline-none block rounded-md"
        />

        <button
          disabled={isLoading}
          type="submit"
          className="p-3 bg-gray-800 text-white block w-full rounded-md"
        >
          {isLoading ? "Loading..." : "Continue with Email"}
        </button>
      </form>
    </div>
  );
}
