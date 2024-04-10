"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { MdErrorOutline } from 'react-icons/md';
import { z } from 'zod';

const ResetPasswordForm = () => {
    const [showPass, setShowPass] = useState(false);

    const handleShowPass = () => {
        setShowPass((prev) => !prev);
      };

  const formSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters")
  }).refine(data=>data.confirmPassword === data.password, {
    message: "Password and confirm password must match!",
    path: ["confirmPassword"]
  })

  type InputType = z.infer<typeof formSchema>

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm<InputType>({
        resolver: zodResolver(formSchema)
      });

      const onSubmit:SubmitHandler<InputType> = (data)=>{
        console.log(data)
        reset()
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* PASSWORD */}
      <div className="mt-1 relative">
        <label htmlFor="email" className="text-sm font-semibold">
          Enter Your New Password
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

      {/* CONFIRM PASSWORD */}
      <div className="mt-1 relative">
        <label htmlFor="email" className="text-sm font-semibold">
          Confirm your Password
        </label>
        <input
          className="w-full mt-2 border-2 placeholder:text-sm border-slate-300 dark:border-slate-600 p-2 rounded-md dark:focus:border-green-600 focus:border-green-600 focus:border-2 focus:outline-none dark:bg-slate-800"
          type={showPass ? "text" : "password"}
          id="password"
          placeholder="Enter your Password"
          {...register("confirmPassword")}
        />

        {errors.confirmPassword ? (
          <div className="flex items-center">
            <MdErrorOutline size={13} className="mr-1 text-red-700" />
            <p className="text-xs text-red-600 dark:opacity-70">
              {errors.confirmPassword?.message}
            </p>
          </div>
        ) : (
          <div className="flex items-center">
            <MdErrorOutline size={13} className="opacity-0" />
            <p className="text-xs text-red-600 opacity-0">.</p>
          </div>
        )}
      </div>
      
      <button className="bg-green-600 py-2 px-3 rounded-md text-white font-medium w-full mt-3">
        Change Password
      </button>
    </form>
  )
}

export default ResetPasswordForm;