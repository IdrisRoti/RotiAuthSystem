import { getServerSession } from "next-auth";
import { authOptions } from "./AuthOptions";

export async function getSession(){
    const session = await getServerSession(authOptions)
    return session;
}


