"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import { z } from "zod";

const SignInForm = ({token}:{token: string | string[] | undefined}) => {
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter()

  const handleShowPass = () => {
    setShowPass((prev) => !prev);
  };

  const formSchema = z.object({
    email: z.string().email("Please input a valid email!"),
    password: z.string().min(8, "Password must be at least 8 characters!"),
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
    const { email, password } = data;
    console.log("Details:", { email, password });
    try {
      setIsLoading(true);
      const response:any = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if(!response.ok) {
        toast.error(response.error),
        setIsLoading(false)
        console.log(response);
        return
      }
      console.log(response);
      toast.success("Login successfull");
      setIsLoading(false);
      reset();
      router.refresh()
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* EMAIL */}
      <div className="mt-1">
        <label htmlFor="email" className="text-sm font-semibold">
          Email
        </label>
        <input
          className="w-full mt-2 border-2 placeholder:text-sm border-slate-300 dark:border-slate-600 p-2 rounded-md dark:focus:border-green-600 focus:border-green-600 focus:border-2 focus:outline-none dark:bg-slate-800"
          type="email"
          id="email"
          placeholder="Enter your email"
          {...register("email")}
        />

        {errors.email ? (
          <div className="flex items-center">
            <MdErrorOutline size={13} className="mr-1 text-red-700" />
            <p className="text-xs text-red-600 dark:opacity-70">
              {errors.email?.message}
            </p>
          </div>
        ) : (
          <div className="flex items-center">
            <MdErrorOutline size={13} className="opacity-0" />
            <p className="text-xs text-red-700 opacity-0">.</p>
          </div>
        )}
      </div>
      {/* PASSWORD */}
      <div className="mt-1 relative">
        <label htmlFor="email" className="text-sm font-semibold">
          Password
        </label>
        <input
          className="w-full mt-2 border-2 placeholder:text-sm border-slate-300 dark:border-slate-600 p-2 rounded-md dark:focus:border-green-600 focus:border-green-600 focus:border-2 focus:outline-none dark:bg-slate-800"
          type={showPass ? "text" : "password"}
          id="password"
          placeholder="Enter your Password"
          {...register("password")}
        />

        {showPass ? (
          <AiOutlineEyeInvisible
            onClick={handleShowPass}
            className="absolute right-4 bottom-7 text-lg cursor-pointer"
          />
        ) : (
          <AiOutlineEye
            onClick={handleShowPass}
            className="absolute right-4 bottom-7 text-lg cursor-pointer"
          />
        )}

        {errors.password ? (
          <div className="flex items-center">
            <MdErrorOutline size={13} className="mr-1 text-red-700" />
            <p className="text-xs text-red-600 dark:opacity-70">
              {errors.password?.message}
            </p>
          </div>
        ) : (
          <div className="flex items-center">
            <MdErrorOutline size={13} className="opacity-0" />
            <p className="text-xs text-red-600 opacity-0">.</p>
          </div>
        )}
      </div>
      <button
        disabled={isLoading || token !== undefined}
        className="bg-green-600 py-2 px-3 rounded-md text-white font-medium w-full mt-3 diasbled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Please wait..." : "Log in"}
      </button>
    </form>
  );
};

export default SignInForm;
