import EmailSent from '@/components/EmailSent'
import VerifyAccountForm from '@/components/VerifyAccountForm'
import React from 'react'

export default function page() {
  const emailSent = true
  return (
    <div className="shadow-lg bg-white sm:h-auto sm:w-[60%] lg:w-[40%] w-full h-full py-12 px-4 sm:rounded-lg dark:bg-slate-800">
      <h2 className="text-2xl font-bold text-center mb-3">Verify your account</h2>
      <p className="text-center mb-6">Enter your registered email to receive the verification link</p>
      {emailSent && <EmailSent />}
      <VerifyAccountForm />
    </div>
  )
}
