import { SendMail, compileEmailTemplate } from "@/libs/SendMail";
import prisma from "@/libs/prismaDb";
import base64url from "base64url";
import { NextResponse } from "next/server";
import { uuid } from "uuidv4";

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    // CHECK IF USER EXISTS
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userExists) {
      return NextResponse.json(
        { message: "Email is not registered" },
        { status: 404 }
      );
    }

    // CREATE RAW TOKEN
    const rawToken = uuid();
    console.log("Raw Token: ", rawToken);

    // ENCODING RAW TOKEN WITH BASE64 URL-SAFE FORMAT
    const token = base64url.encode(rawToken);
    console.log("Token: ", token);

    // ADD RESET PASSWORD TOKEN IN DB
    const updatedUser = await prisma.user.update({
      where: {
        id: userExists.id,
      },
      data: {
        resetPasswordToken: token,
      },
    });

    // SEND MAIL
    const url = `${process.env.NEXTAUTH_URL}/reset-pass?token=${token}&email=${updatedUser.email}`;
    await SendMail({
      to: updatedUser.email,
      subject: "Reset your password",
      body: compileEmailTemplate(
        updatedUser.name,
        url,
        "Reset your password",
        "Please click on the button below to reset your password"
      ),
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occured!" }, { status: 500 });
  }
}
