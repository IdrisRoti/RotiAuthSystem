"use client";

import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Input from "./Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import validator from "validator"
import { zodResolver } from "@hookform/resolvers/zod";
import toast from 'react-hot-toast';
import { MdErrorOutline } from "react-icons/md";
import axios from "axios";

export default function SignUpForm() {
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowPass = () => {
    setShowPass((prev) => !prev);
  };

  const formSchema = z.object({
    name: z.string().min(2, "Minimum of 2 charcters!"),
    email: z.string().email("Please input a valid email!"),
    phone: z.string().refine(validator.isMobilePhone, "Please enter a valid phone number!"),
    password: z.string().min(8, "Password must be at least 8 characters!"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters!"),
    check: z.literal(true, {
        errorMap: ()=>({
            message: "Please accept T&C"
        })
    })
  }).refine((data)=>data.password === data.confirmPassword, {
    message: "Password and Confirm password must match",
    path: ["password"]
  })

  
  type InputType = z.infer<typeof formSchema>

  const { register, reset, handleSubmit, formState: {errors} } = useForm<FieldValues>(
    {resolver: zodResolver(formSchema)}
  );

  const onSubmit:SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)
    const {name, password, email, phone} = data
    console.log(name, password, email, phone);
    
    try {
      const result = await axios.post("/api/register", {name, password, email, phone})
      console.log(result.request.status)
      setIsLoading(false)
      reset()
      toast.success("Account created successfully.")
      toast.success("A verification link has been sent to the Email you provided, click on the link to verify your account. You can also check your spam folder for the link.", {
        duration: 10000,
        position: "top-center"
      })
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      toast.error("Something went wrong")
    }
    
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-left mt-6"
    >
      <Input
        label="Your Name"
        name="name"
        placeholder="Enter Your Name"
        type="text"
        register={register}
        errors={errors}
      />
      <Input
        label="Email"
        name="email"
        placeholder="Enter Your Email"
        type="email"
        register={register}
        errors={errors}
      />
      <Input
        label="Phone Number"
        name="phone"
        placeholder="Enter Your Phone Number"
        type="text"
        register={register}
        errors={errors}
      />
      <div className="relative">
        <Input
          label="Password"
          name="password"
          placeholder="Enter Your Password"
          type={showPass ? "text" : "password"}
          register={register}
          errors={errors}
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
      </div>
      <div className="relative">
        <Input
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm Your Password"
          type={showPass ? "text" : "password"}
          register={register}
          errors={errors}
        />
      </div>
      {/* CHECK BOX */}
      <div className="mt-2 mb-4">
        <div className="flex items-center">
        <input type="checkbox" {...register("check")} />
        <p className="ml-3 text-sm">
          Agree with <span className="font-semibold">Terms & Conditions</span>
        </p>
        </div>
        {errors.check ? (
        <div className="flex items-center">
        <MdErrorOutline size={13} className="mr-1 text-red-700" />
                {/* @ts-ignore */}
        <p className="text-xs text-red-600 dark:opacity-70">{errors.check?.message}</p>
      </div>
      ): (<div className="flex items-center">
      <MdErrorOutline size={13} className="mr-1 opacity-0" />
              {/* @ts-ignore */}
      <p className="text-xs opacity-0">.</p>
    </div>)}
      </div>
      <button disabled={isLoading} className="bg-green-600 py-2 px-3 rounded-md text-white font-medium diasbled:cursor-not-allowed disabled:opacity-50">
        {isLoading ? "Please wait..." : "Sign Up"}
      </button>
    </form>
  );
}
