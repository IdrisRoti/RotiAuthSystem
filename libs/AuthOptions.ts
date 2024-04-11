import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prismaDb";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          type: "email",
          label: "Email",
        },
        password: {
          type: "password",
          label: "Password",
        },
      },
      async authorize(credentials) {
        if(!credentials?.email) throw new Error("Please enter your Email")
        // CHECK IF USER EXISTS
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        
        if (!user) throw new Error("User does not exist!");

        if (!credentials?.password)
          throw new Error("Please enter your password!");

        // CHECK IF ENTERED PASSWORD MATCHES WITH THE USER
        const passwordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordCorrect)
          throw new Error("Username or Password not correct");

        return user;
      },
    }),
  ],
};
