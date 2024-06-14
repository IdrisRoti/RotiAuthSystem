import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token, email } = await req.json();
  console.log("from verify account, token and email: ", token, email)

  try {
    // CHECK IF USER EXISTS
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    console.log("from verify account, userExists: ", userExists)

    if (!userExists) {
        return NextResponse.json({ message: "Email is not registered" }, { status: 404 });
    }

    // CHECK IF TOKEN MATCHES
    const tokenMatch = userExists.verificationToken === token
    if(!tokenMatch){
        if (!tokenMatch) {
            return NextResponse.json({ message: "Invalid Token" }, { status: 409 });
        }
    }

    console.log("from verify account, tokenMatch: ", tokenMatch)

    // UPDATE USER IN DB
    const updatedUser = await prisma.user.update({
        where:{
            email
        },
        data:{
            verificationToken:null,
            emailVerified: true
        }
    })

    console.log("from verify account, UPDATED USER: ", updatedUser)
    return NextResponse.json(updatedUser, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occured!" }, { status: 500 });
  }
}
