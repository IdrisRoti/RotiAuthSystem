import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { uuid } from "uuidv4";
import base64url from "base64url";
import { SendMail, compileEmailTemplate } from "@/libs/SendMail";

export async function POST(req: Request) {
  const { name, email, phone, password } = await req.json();
  try {
    // CHECK IF USER ALREADY EXIST IN THE DB
    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userExist)
      return NextResponse.json(
        { message: "User already exist!" },
        { status: 409 }
      );

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);
    // CREATE NEW USER
    const newUser = await prisma.user.create({
      data: { name, email, phone, password:hashedPassword },
    });

    //*************************** SEND VERIFICATION MAIL *********************************************/ 
    // CREATE RAW TOKEN
    const rawToken = uuid()
    console.log("Raw Token: ", rawToken)

    // ENCODING RAW TOKEN WITH BASE64 URL-SAFE FORMAT
    const token = base64url.encode(rawToken)
    console.log("Token: ", token)

    await prisma.user.update({
      where:{
        id:newUser.id
      },
      data:{
        verificationToken:token
      }
    })
    // SEND MAIL
    const url =`${process.env.NEXTAUTH_URL}sign-in?token=${token}&email=${newUser.email}`
    await SendMail({to:newUser.email, subject:"Verify Your Email", body:compileEmailTemplate(newUser.name, url, "Verify your email", "Please click on the button below to verify your account" )})

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occured!" }, { status: 500 });
  }
}
