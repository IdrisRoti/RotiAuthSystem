import ResetPassBtn from "@/components/ResetPassBtn";
import SignInForm from "@/components/SignInForm";
import { getSession } from "@/libs/getSession";
import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

type SearchParamsType = {
  searchParams: { 
    token: string | string[] | undefined,
    email: string | string[] | undefined,
  };
};

export default async function page({ searchParams }: SearchParamsType) {

  const { token, email } = searchParams;

  const session =await getSession()

  if(session?.user){
    redirect("/");
  }

  if(token !== undefined && email !== undefined){

    try {
      const result = await axios.post(`${process.env.NEXTAUTH_URL}api/verify-account`, {token, email})
      console.log("Verification result: ", result)
      redirect("/sign-in")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="shadow-lg bg-white sm:h-auto sm:w-[60%] lg:w-[40%] w-full h-full py-12 px-4 sm:rounded-lg dark:bg-slate-800">
      <h2 className="text-2xl font-bold text-center mb-8">
        Log into your account
      </h2>
      <SignInForm token={token}/>
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
