"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdErrorOutline } from 'react-icons/md';
import { z } from 'zod';

const VerifyAccountForm = () => {

  const formSchema = z.object({
    email: z.string().email("Please enter a valid email")
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
      
      <button className="bg-green-600 py-2 px-3 rounded-md text-white font-medium w-full mt-3">
        Verify
      </button>
    </form>
  )
}

export default VerifyAccountForm