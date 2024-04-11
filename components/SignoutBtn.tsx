"use client"

import { signOut } from 'next-auth/react'
import React from 'react'

export default function SignoutBtn() {
  return (
    <button onClick={()=> signOut()} className="mt-3 px-3 py-1 border border-green-600 rounded-md">
    Sign Out
  </button>
  )
}
