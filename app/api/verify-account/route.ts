import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token, email } = await req.json();

  try {
    // CHECK IF USER EXISTS
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userExists) {
        return NextResponse.json({ message: "Email does not exist" }, { status: 404 });
    }

    const tokenMatch = userExists.verificationToken === token
    if(!tokenMatch){
        if (!userExists) {
            return NextResponse.json({ message: "Invalid Token" }, { status: 409 });
        }
    }

    const updatedUser = await prisma.user.update({
        where:{
            email
        },
        data:{
            verificationToken:null,
            emailVerified: true
        }
    })

    return NextResponse.json(updatedUser, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occured!" }, { status: 500 });
  }
}
