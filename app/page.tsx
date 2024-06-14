import SigninBtn from "@/components/SigninBtn";
import SignoutBtn from "@/components/SignoutBtn";
import { getSession } from "@/libs/getSession";

const page = async () => {
  const session = await getSession();
  console.log(session)

  return (
    <main className="p-4">
      {session?.user && <div className="border border-green-300 bg-green-50 rounded-lg p-4 opacity-70 mb-3 text-center dark:bg-green-200 dark:bg-opacity-50 font-semibold dark:text-white">Your Account {session?.user.emailVerified ? "is" : "is not"} verified!</div>}
      <div className="font-light text-3xl">
        Hi {session?.user.name}, Welcome to our{" "}
        <span className="text-green-700 font-bold">Auth System</span> {":)"}
      </div>
      {session?.user ? <SignoutBtn /> : <SigninBtn />}
    </main>
  );
};

export default page;
