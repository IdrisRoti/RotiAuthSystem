import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";
import  bcrypt  from 'bcryptjs';

export async function POST(req: Request) {
  const { password, token, email } = await req.json();

  try {
    // CHECK IF USER EXISTS
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userExists) {
        return NextResponse.json({ message: "Email is not registeredt" }, { status: 404 });
    }

    const tokenMatch = userExists.resetPasswordToken === token
    if(!tokenMatch){
        if (!userExists) {
            return NextResponse.json({ message: "Invalid Token" }, { status: 409 });
        }
    }

    // ENCRYPT INCOMING PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log("New Hashed Password: ",hashedPassword )

    const updatedUser = await prisma.user.update({
        where:{
            email
        },
        data:{
            resetPasswordToken:null,
            password: hashedPassword
        }
    })

    return NextResponse.json(updatedUser, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occured!" }, { status: 500 });
  }
}
