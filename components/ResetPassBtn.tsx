"use client"

import { useRouter } from "next/navigation"

const ResetPassBtn = () => {

const router = useRouter()

    const resetPassword = ()=>{
        router.push("/reset-pass")
      }

  return (
    <button className='text-xs underline' onClick={resetPassword}>Reset Password</button>
  )
}

export default ResetPassBtn