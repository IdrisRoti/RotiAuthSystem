import SignoutBtn from "@/components/SignoutBtn";
import { getSession } from "@/libs/getSession";
import { redirect } from "next/navigation";

const page = async () => {
  // const session = await getSession();

  // if (!session?.user) {
  //   redirect("/sign-in");
  // }

  return (
    <main>
      <div className="font-light text-3xl">
        Hi, Welcome to our{" "}
        <span className="text-green-700 font-bold">Auth System</span>
      </div>
      <SignoutBtn />
    </main>
  );
};

export default page;
