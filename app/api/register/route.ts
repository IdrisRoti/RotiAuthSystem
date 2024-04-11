import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

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

    // SEND VERIFICATION MAIL

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occured!" }, { status: 500 });
  }
}
