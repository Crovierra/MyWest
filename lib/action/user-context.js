"use client"

import { createContext, useState, useContext, useEffect } from "react"

const UserContext = createContext()

export const UserProvider = ({children}) => {
    // const [user, setUser] = useState(null)
    
    const [user, setUser ] = useState(()=>{
        if(typeof window !== "undefined"){
            const name = sessionStorage.getItem("user")
            const id = sessionStorage.getItem("userId")
        
            return name && id ? {name: name, userId: id } : null
        }
        return null;
    })

    const signIn = (userData) => {
        setUser(userData)
        
        sessionStorage.setItem("user", userData.name)
        sessionStorage.setItem("userId", userData.user_id)
    }

    //Reset user data to null
    const signOut = () => {
        alert("Sign Out Successful")
        setUser(null)
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("username")
    }

    return (
        <UserContext value={{user, signIn, signOut}}>
            {children}
        </UserContext>
    )
}

export const useUser = () => useContext(UserContext)