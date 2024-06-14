"use client";

import ResetPassBtn from "@/components/ResetPassBtn";
import SignInForm from "@/components/SignInForm";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type SearchParamsType = {
  searchParams: {
    token: string | string[] | undefined;
    email: string | string[] | undefined;
  };
};

export default function SignIn({ searchParams }: SearchParamsType) {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session, status } = useSession();

  const router = useRouter();

  if (session?.user || status === "authenticated") {
    router.push("/");
  }

  const { token, email } = searchParams;

  async function verifyUser() {
    try {
      setIsLoading(true)
      const result = await axios.post("/api/verify-account", { token, email });
      console.log("Verification result: ", result);
      console.log("Verification result status: ", result.status);
      setIsLoading(false)
      toast.success("Your account has been verified successfully.");
      router.push("/sign-in");
    } catch (error) {
      setIsLoading(false)
      console.log(error);
      toast.error(
        "We couldn't verify your account at this time. Please try again later"
      );
    }
  }

  return (
    <div className="shadow-lg bg-white sm:h-auto sm:w-[60%] lg:w-[40%] w-full h-full py-12 px-4 sm:rounded-lg dark:bg-slate-800">
      {token !== undefined && email !== undefined ? (
        <button disabled={isLoading}
        className="bg-green-600 py-2 px-3 rounded-md text-white font-medium w-full mt-3 diasbled:cursor-not-allowed disabled:opacity-50 hover:opacity-80" onClick={verifyUser}>Click to verify your account</button>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-center mb-8">
            Log into your account
          </h2>
          <SignInForm />
          <div className="mt-1 flex items-center justify-between">
            <span className="text-xs">
              Dont have an account ?{" "}
              <Link
                className="font-bold underline font-green-600"
                href="/sign-up"
              >
                Sign Up
              </Link>
            </span>
            <ResetPassBtn />
          </div>
        </>
      )}
    </div>
  );
}
