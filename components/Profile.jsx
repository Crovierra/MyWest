"use client"

import React from 'react'
import { useUser } from "@/lib/action/user-context"
import { BsFillPersonVcardFill } from "react-icons/bs";

const Profile = () => {
  const { user } = useUser()
  
  return (
    //(-) Give effect when hover, adjust element
    <div className='flex flex-row justify-start items-center gap-2'>
        <BsFillPersonVcardFill className={user ? "visible" : "hidden"}/>
        <h3 className='text-lg font-semibold'>{user ? `Hi ` + user.name : "Hi, welcome to My West"}</h3>
    </div>
  )
}

export default Profile