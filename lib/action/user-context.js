"use client"

import { createContext, useState, useContext, useEffect } from "react"

const UserContext = createContext()

export const UserProvider = ({children}) => {
    // const [user, setUser] = useState(null)
    
    const [user, setUser ] = useState(()=>{
        if(typeof window !== "undefined"){
            const name = sessionStorage.getItem("username")
            console.log("Retrieved from session :", name)
            return name ? {name: name} : null
        }
        return null;
    })

    // useEffect(() => {
    //     const name = sessionStorage.getItem("username");
    //     if (name) {
    //         setUser({name: name});
    //     }
    // }, []);


    const signIn = (userData) => {
        setUser(userData)
        sessionStorage.setItem("username", userData.name)
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