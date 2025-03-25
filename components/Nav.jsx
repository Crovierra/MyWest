"use client"

import React from 'react'
import Image from "next/image"
import Link from 'next/link'
import { useUser } from '@/lib/action/user-context'
import { useState, useEffect } from "react"

const Nav = () => {
   const { user, signOut } = useUser()
   const [ token, setToken ] = useState(null)
   useEffect(()=> {
        const getToken = sessionStorage.getItem("token")
        setToken(getToken)
   }, [user, token])
   

  return (
    <nav className='bg-white shadow-md w-full'>
        <div className='flex flex-row h-35 justify-evenly max-sm:justify-between'>
            <div className='flex md:ml-[-2%] sm:ml-[-15%]'>
            <Image 
            src="/image/My-West.png" 
            alt="My West Logo"
            width={150}
            height={150}
            className='cursor-pointer'
            />
            <div className='flex flex-col justify-center ml-[-20px]'>
            <h1 className='font-bold text-2xl max-lg:text-xl'>My West</h1>
            <p className='max-lg:text-xs'>Wallet Expense Tracker</p>
            </div>
            </div>
            <div className='flex'>
            <ul className='flex flex-row justify-between gap-15 min-md:gap-4 max-md:hidden items-center max-sm:hidden'>
                <li><Link href="/" className='hover:text-green-500'>Home</Link></li>
                <li><Link href="/transactions" className='hover:text-green-500'>Transactions</Link></li>
                <li><Link href="/about" className='hover:text-green-500'>About</Link></li>
            </ul>
            </div>
            <div className='flex flex-row justify-center items-center gap-2'>
                {user && token ? (
                    <>
                    <button className="btn rounded-2xl bg-green-500 text-white min-w-[120px] h-8 cursor-pointer hover:opacity-70 drop-shadow-md max-sm:hidden max-md:hidden">
                    <Link href="/new">New Input</Link>
                    </button>
                    <button 
                    className="btn rounded-2xl bg-black opacity-80 w-[120px] h-8 text-white cursor-pointer hover:opacity-70 drop-shadow-md max-sm:hidden max-md:hidden" href="/sign-in"
                    onClick={signOut}>
                    <Link href="/">Logout</Link>
                    </button>
                    </>
                ) : (
                    <>
                    <button className="btn rounded-2xl bg-green-500 text-white min-w-[120px] h-8 cursor-pointer hover:opacity-70 drop-shadow-md max-sm:hidden max-md:hidden">
                    <Link href="/sign-in">Sign In</Link>
                    </button>
                    <button 
                    className="btn rounded-2xl bg-black opacity-80 w-[120px] h-8 text-white cursor-pointer hover:opacity-70 drop-shadow-md max-sm:hidden max-md:hidden" href="/sign-in">
                    <Link href="/sign-up">Sign Up</Link>
                    </button>
                </>
                )}
                
            </div>
            <div className="md:hidden justify-center items-center flex max-sm:mr-[5%]">
            <button className="text-gray-800 text-2xl">☰</button>
            </div>
        </div>
    </nav>
  )
}

export default Nav