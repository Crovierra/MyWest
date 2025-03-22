"use client"

import CustomInput from "./CustomInput"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/lib/action/user-context"

const AuthForm = ({title}) => {
    const {signIn} = useUser();
    const router = useRouter()
    const [newUser, setNewUser] = useState({
        phone: "",
        password: "",
        name: ""
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log("Loading status:", loading);
    }, [loading]);

    async function handleSubmitForm(e){
        e.preventDefault()
        try {
            setLoading(true)
            
            const endpoint = title === "sign-in" ? "/api/sign-in" : "/api/sign-up"
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {"content-type" : "application/json"},
                body: JSON.stringify(newUser)
            })
            let data;
            try{
                data = await response.json() // Isinya user + accessToken, check Backend
            } catch (err) {
                data = null
                console.log("Data :", err)
            }

            
            if (title === "sign-in"){
                signIn(data.user)
            } else {
                console.log("Failed to sign-in")
            }

            if (response.ok){
                sessionStorage.setItem("token",data.accessToken)
                
            
                alert("Success")
                router.push(title === "sign-in" ? "/" : "/sign-in")
            } else {
                console.log("Failed")
                return;
            }
            // If success then ?? Save data globally (?)
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false)
        }
    }

    function handleChange(e){
        const {name, value} = e.target
        setNewUser(prevValue => {
            return {...prevValue, [name]: value}
        })
    }      

  return (
    <div className="w-full flex flex-col h-screen justify-center items-center mt-[-8%] mb-[8%] overflow-x-hidden">
        {title === "sign-in" ? 
            (
                <div>
            <form className='flex flex-col items-center gap-5' onSubmit={handleSubmitForm}>
                <CustomInput
                forLabel="phone"
                idLabel="phone" 
                type="tel"
                placeholder="Insert your phone number"
                name="phone"
                label="Phone Number"
                onChange={handleChange}
                value={newUser.phone}
                />
                <CustomInput
                forLabel="password"
                idLabel="password" 
                type="password"
                placeholder="Insert your password"
                name="password"
                label="Password"
                onChange={handleChange}
                value={newUser.password}
                />
                <button disabled={loading} type="submit" className="btn bg-green-500 rounded-2xl w-[45%] py-0.5 text-white cursor-pointer" >{loading ? "Loading..." : "Get Started"}</button>
                </form>
                <p className="mt-3">Don't have an account ? <span className="text-green-500 cursor-pointer"><a href="/sign-up">Sign Up</a></span></p>
                </div>
            ) : (   
                <div>
                <form className='flex flex-col items-center gap-5' onSubmit={handleSubmitForm}>
                <CustomInput
                forLabel="name"
                idLabel="name" 
                type="text"
                placeholder="What is your name ?"
                name="name"
                label="Full Name"
                onChange={handleChange}
                value={newUser.name}
                />
                <CustomInput
                forLabel="phone"
                idLabel="phone" 
                type="tel"
                placeholder="Insert your phone number"
                name="phone"
                label="Phone Number"
                onChange={handleChange}
                value={newUser.phone}
                />
                <CustomInput
                forLabel="password"
                idLabel="password" 
                type="password"
                placeholder="Insert your password"
                name="password"
                label="Password"
                onChange={handleChange}
                value={newUser.password}
                />
                <button disabled={loading} type="submit" className="btn bg-green-500 rounded-2xl w-[75%] py-0.5 text-white cursor-pointer">{loading ? "Loading..."  : "Start Tracking Now"}</button>
                </form>
                <p className="mt-3">Already have an account ? <span className="text-green-500 cursor-pointer"><a href="/sign-in">Sign In</a></span></p>
                </div>
            )
        }
    </div>
    )
}

export default AuthForm