"use client"

import Link from 'next/link'
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useUser } from '@/lib/action/user-context'

const Sidebar = () => {
    const { isOpen, closeSidebar, user, signOut} = useUser()
    const [token, getToken] = useState(null)
    useEffect(()=>{
        const access = sessionStorage.getItem("token")
        getToken(access)
    }, [user])

  return (
    <motion.nav 
    initial={{ x: "100%" }} // Start off-screen
    animate={{ x: isOpen ? "0%" : "100%" }} // Animate open/close
    transition={{ type: "tween", duration: 0.3 }} // Smooth animation
    className='flex flex-col justify-center fixed items-center right-0 top-0  shadow-lg bg-white w-[180px] h-full min-md:hidden z-1'>
        
        <button className='btn w-[35px] rounded-full p-1 cursor-pointer shadow-lg fixed top-10 right-4' onClick={closeSidebar}>X</button>
        <ul className='flex flex-col gap-10 fixed top-50'>
            <li><Link href="/" className='hover:text-green-500' onClick={closeSidebar}>Home</Link></li>
            <li><Link href="/transactions" className='hover:text-green-500' onClick={closeSidebar}>Transactions</Link></li>
            <li><Link href="/about" className='hover:text-green-500' onClick={closeSidebar}>About</Link></li>
        </ul>
    
    {user && token ? (
        <div className="flex flex-col gap-4 fixed bottom-30">
        <button className="btn rounded-2xl bg-green-500 text-white min-w-[120px] h-8 cursor-pointer hover:opacity-70 drop-shadow-md " onClick={closeSidebar}>
        <Link href="/new">New Input</Link>
        </button>
        <button 
        className="btn rounded-2xl bg-black opacity-80 w-[120px] h-8 text-white cursor-pointer hover:opacity-70 drop-shadow-md" href="/sign-in" onClick={closeSidebar}
        onClick={signOut}>
        <Link href="/">Logout</Link>
        </button>
        </div>
    ) : (
        <div className="flex flex-col gap-4 fixed bottom-30">
        <button className="btn rounded-2xl bg-green-500 text-white min-w-[120px] h-8 cursor-pointer hover:opacity-70 drop-shadow-md " onClick={closeSidebar}>
        <Link href="/sign-in">Sign In</Link>
        </button>
        <button 
        className="btn rounded-2xl bg-black opacity-80 w-[120px] h-8 text-white cursor-pointer hover:opacity-70 drop-shadow-md" href="/sign-in" onClick={closeSidebar}>
        <Link href="/sign-up">Sign Up</Link>
        </button>
        </div>
    )}
    </motion.nav>
  )
}

export default Sidebar