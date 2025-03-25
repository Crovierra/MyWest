"use client"

import { useState } from "react"
import CustomInput from './CustomInput'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useUser } from "@/lib/action/user-context"
  

const Fund = () => {
    const {user} = useUser();
    const [isIncome, setIsIncome] = useState(true)
    const [isLoading, setLoading] = useState(false)
    const [transaction, setTransaction] = useState({
        user: user?.name || "",
        userId: user?.userId || "",
        amount: 0,
        status: "",
        category: "",
        description: ""
    })
    function handleValueChange(key, value){
        if(key === "status"){
            setIsIncome(value === "Income")
        }
        setTransaction(prevValue => {
            return {...prevValue, [key]:value}
        })
    }

    function handleChange(e){
        const {name, value } = e.target
        setTransaction(prevValue => {
            return {...prevValue, [name]:value}
        })
    }

    const submitTransaction = async (e) =>{
        e.preventDefault()
        const token = sessionStorage.getItem("token")
        if(!token){
            Alert("To use this feature, you have to sign in")
            return;
        }
        try {
            const newTransaction = {
                userId: user?.userId || "",
                date: new Date().toISOString().split("T")[0], // Add current date
                status: transaction.status,
                category: transaction.category,
                description: transaction.description,
                amount: transaction.amount
            }
            setLoading(true)
            const response = await fetch(`/api/transactions/${newTransaction.id}`,{
                method: "POST",
                headers: {"Content-Type" : "application/json",
                    Authrozation: `Bearer ${token}`
                },
                body: JSON.stringify(newTransaction)
            })

            if(!response.ok){
                console.log("Failed to send data")
                return;
            }
            alert("Success")
            const data = await response.json()

        } catch (error) {
            console.log("Error sending request to database")
            return;
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className='flex flex-col p-4 gap-2 mt-2 max-xl:p-2'>
        <form className='flex flex-col' action="/transactions" method="POST" onSubmit={submitTransaction}>
        <p className='text-xl font-semibold'>Fast Input</p>
        <CustomInput forLabel="amount" idLabel="amount" label="Amount ($)" name="amount" type="text" placeholder="ex : 250" onChange={handleChange}/>
        <label htmlFor="options">Status</label>
        <Select onValueChange={(value) => handleValueChange("status", value)} required>
            <SelectTrigger className="w-[full]">
                <SelectValue placeholder="Income / Expense" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Income" >Income</SelectItem>
                <SelectItem value="Expense" >Expense</SelectItem>
            </SelectContent>
        </Select>
        <label htmlFor="options2">Category</label>
        <Select onValueChange={(value) => handleValueChange("category", value)}>
            <SelectTrigger className="w-[full]]">
                <SelectValue placeholder={isIncome ? "Salary, Bonus, etc" : "Food, Entertaiment, etc"} />
            </SelectTrigger>
            {isIncome ? (
            <SelectContent>
                <SelectItem value="Salary">Salary</SelectItem>
                <SelectItem value="Bonus">Bonus</SelectItem>
                <SelectItem value="Gift">Gift</SelectItem>
            </SelectContent>
            ) : (
            <SelectContent>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Entertaiment">Entertaiment</SelectItem>
                <SelectItem value="Clothes">Clothes</SelectItem>
                <SelectItem value="Rent">Rent</SelectItem>
                <SelectItem value="Study">Study</SelectItem>
            </SelectContent>
            )}
            
        </Select>
        <button disabled={isLoading} className='bg-black text-white px-4 py-1.5 rounded-lg mt-4 cursor-pointer'>
            {isLoading ? "Loading . ." : "Add"}
        </button>
        </form>

    </div>
  )
}

export default Fund