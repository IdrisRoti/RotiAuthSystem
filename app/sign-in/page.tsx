import ResetPassBtn from "@/components/ResetPassBtn";
import SignInForm from "@/components/SignInForm";
import { getSession } from "@/libs/getSession";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page() {

  const session =await getSession()

  if(session?.user){
    redirect("/");
  }

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
