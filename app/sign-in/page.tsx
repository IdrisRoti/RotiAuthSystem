"use client";

import ResetPassBtn from "@/components/ResetPassBtn";
import SignInForm from "@/components/SignInForm";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

type SearchParamsType = {
  searchParams: {
    token: string | string[] | undefined;
    email: string | string[] | undefined;
  };
};

export default function page({ searchParams }: SearchParamsType) {
  const {data:session, status} = useSession()

  const router = useRouter()

  if(session?.user || status === "authenticated"){
    router.push("/")
  }


  const { token, email } = searchParams;

  useEffect(() => {
    async function verifyUser() {
      if (token !== undefined && email !== undefined) {
        try {
          // toast.loading("Verifying your account please wait...")
          const result = await axios.post(
            "/api/verify-account",
            { token, email }
          );
          console.log("Verification result: ", result);
          console.log("Verification result status: ", result.status);
          toast.success("Your account has been verified successfully.")
          router.push("/sign-in")
        } catch (error) {
          console.log(error);
          toast.error("We couldn't verify your account at this time. Please try again")
        }
      }
    }

    verifyUser()
  }, []);

  return (
    <div className="shadow-lg bg-white sm:h-auto sm:w-[60%] lg:w-[40%] w-full h-full py-12 px-4 sm:rounded-lg dark:bg-slate-800">
      <h2 className="text-2xl font-bold text-center mb-8">
        Log into your account
      </h2>
      <SignInForm />
      <div className="mt-1 flex items-center justify-between">
        <span className="text-xs">
          Don't have an account ?{" "}
          <Link className="font-bold underline font-green-600" href="/sign-up">
            Sign Up
          </Link>
        </span>
        <ResetPassBtn />
      </div>
    </div>
  );
}
