"use client"

import { useEffect, useState } from 'react'
import { useUser } from "@/lib/action/user-context"
import { BsFillPersonVcardFill } from "react-icons/bs";

const Profile = () => {
  const { user } = useUser()
  const [clientUser, setClientUser] = useState(null)
  useEffect(()=> {
    const name = user?.name
    setClientUser(name)
  }, [user])
  
  return (
    //(-) Give effect when hover, adjust element
    <div className='flex flex-row justify-start items-center gap-2'>
        <BsFillPersonVcardFill className={clientUser ? "visible" : "hidden"}/>
        <h3 className='text-lg font-semibold'>{clientUser ? `Hi ` + clientUser : "Hi, welcome to My West"}</h3>
    </div>
  )
}

export default Profile