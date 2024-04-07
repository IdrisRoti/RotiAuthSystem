import SignUpForm from "@/components/SignUpForm";
import Link from "next/link";

export default function page() {

  return (
    <div className="shadow-lg bg-white sm:h-auto sm:w-[60%] lg:w-[40%] w-full h-full py-12 px-4 sm:rounded-lg dark:bg-slate-800">
      <h2 className="text-2xl font-bold text-center">Create an account</h2>
      <SignUpForm />
      <span className="text-xs">Already have an account ? <Link className="font-bold underline font-green-600" href="/sign-in">Log in</Link></span>
    </div>
  );
}
