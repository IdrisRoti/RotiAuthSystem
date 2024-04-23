"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";
import { z } from "zod";
import EmailSent from "./EmailSent";
import { useState } from "react";
import toast from "react-hot-toast";

const VerifyAccountForm = () => {
  const [emailSent, setEmailSent] = useState(false);

  const formSchema = z.object({
    email: z.string().email("Please enter a valid email"),
  });

  type InputType = z.infer<typeof formSchema>;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    console.log(data);
    try {
      // SEND MAIL THAT CONTAINS RESET PASSWORD LINK AND RESET PASSWORD TOKEN
      const result = await axios.post("/api/sendMail", { email: data.email });
      console.log("From verify account: ", result);
      setEmailSent(true);
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="shadow-lg bg-white sm:h-auto sm:w-[60%] lg:w-[40%] w-full h-full py-12 px-4 sm:rounded-lg dark:bg-slate-800">
      <h2 className="text-2xl font-bold text-center mb-3">
        Verify your account
      </h2>
      <p className="text-center mb-6">
        Enter your registered email to receive the password reset link
      </p>
      {emailSent && <EmailSent label="verify your account" />}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* EMAIL */}
        <div className="mt-1">
          <input
            className="w-full mt-2 border-2 placeholder:text-sm border-slate-300 dark:border-slate-600 p-2 rounded-md dark:focus:border-green-600 focus:border-green-600 focus:border-2 focus:outline-none dark:bg-slate-800"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />

          {errors.email ? (
            <div className="flex items-center">
              <MdErrorOutline size={13} className="mr-1 text-red-700" />
              <p className="text-xs text-red-600 dark:opacity-70">
                {errors?.email.message}
              </p>
            </div>
          ) : (
            <div className="flex items-center">
              <MdErrorOutline size={13} className="opacity-0" />
              <p className="text-xs text-red-700 opacity-0">.</p>
            </div>
          )}
        </div>

        <button className="bg-green-600 py-2 px-3 rounded-md text-white font-medium w-full mt-3 disabled:opacity-40 disabled:cursor-not-allowed">
          Verify
        </button>
      </form>
    </div>
  );
};

export default VerifyAccountForm;
