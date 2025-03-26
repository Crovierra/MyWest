"use client"

import { createContext, useState, useContext, useEffect } from "react"

const UserContext = createContext()

export const UserProvider = ({children}) => {
    // const [user, setUser] = useState(null)
    const [isOpen, setOpen] = useState(false)
    const [user, setUser ] = useState(()=>{
        if(typeof window !== "undefined"){
            const name = sessionStorage.getItem("user")
            const id = sessionStorage.getItem("userId")
            const token = sessionStorage.getItem("token")
            return name && token ? {name: name, userId: id } : null
        }
        return null;
    })

    const signIn = (userData) => {
        setUser(userData)
        
        sessionStorage.setItem("user", userData.name)
        sessionStorage.setItem("userId", userData.user_id)
    }

    const openSidebar = () =>{
        setOpen(true)
    }

    const closeSidebar = () =>{
        setOpen(false)
    }
    //Reset user data to null
    const signOut = () => {
        alert("Sign Out Successful")
        setUser(null)
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("username")
    }

    return (
        <UserContext value={{user, signIn, signOut, isOpen, openSidebar, closeSidebar}}>
            {children}
        </UserContext>
    )
}

export const useUser = () => useContext(UserContext)