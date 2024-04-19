import SigninBtn from "@/components/SigninBtn";
import SignoutBtn from "@/components/SignoutBtn";
import { SendMail } from "@/libs/SendMail";
import { getSession } from "@/libs/getSession";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getSession();
  console.log(session)

  // await SendMail({to:"idrisomisakin@gmail.com", subject:"Test", body:"Hello world"})

  // if(!session) redirect("sign-in")

  return (
    <main>
      {session?.user && <div className="bg-green-200 px-3 py-3 rounded-md mb-3">Your Account {session?.user.emailVerified ? "is" : "is not"} verified!</div>}
      <div className="font-light text-3xl">
        Hi {session?.user.name}, Welcome to our{" "}
        <span className="text-green-700 font-bold">Auth System</span>
      </div>
      {session?.user ? <SignoutBtn /> : <SigninBtn />}
    </main>
  );
};

export default page;
