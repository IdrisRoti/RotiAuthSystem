"use client"

import ThemeContext from '@/context/ThemeContext'
import React, { useContext } from 'react'
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5'

const ThemeToggler = () => {
    const {darkMode, setDarkMode} = useContext(ThemeContext)

    const setLightMode = () =>{
        setDarkMode(false)
        localStorage.removeItem("darkTheme")
    }

    const DarkMode = () =>{
        setDarkMode(true)
        localStorage.setItem("darkTheme", "true")
    }

  return (
    <div>
        {darkMode ? (<button className='absolute bottom-5 right-5 w-12 h-12 rounded-full  shadow-lg grid place-items-center dark:bg-slate-900 dark:text-slate-100' onClick={setLightMode}><IoSunnyOutline /></button>) : (<button className='absolute bottom-5 right-5 w-12 h-12 rounded-full  shadow-lg grid place-items-center dark:bg-slate-900 dark:text-slate-100' onClick={DarkMode}><IoMoonOutline /></button>)}
    </div>
  )
}

export default ThemeToggler