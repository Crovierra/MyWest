"use client"

import CustomInput from '@/components/CustomInput'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { useState } from "react"

const page = () => {
    const [isIncome, setIsIncome] = useState(true)
        function handleChange(key,value){
            if(key === "status"){
                setIsIncome(value === "income")
            }
            setTransaction((prevData) => ({
                ...prevData, [key]:value
            }))
        }

        function handleInput(e){
            const {name, value} = e.target 
            setTransaction({...transaction, [name]:value})
        }

    const [transaction, setTransaction] = useState({
        user: "",
        userId: "",
        amount: 0,
        status: "",
        category: "",
        description: ""
    })

    function submitForm(e){
        e.preventDefault()

        fetch("/api/transactions",{
            method: "POST",
            headers: {"content-type" :"application/json"},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => console.log("Success :", data))
        .catch(err => console.log("Error Submiting Form :", err))

        setData({
            user: "",
            userId: "",
            amount: 0,
            type: "",
            category: "",
            description: ""
        })
    }


  return (
    <div className='flex flex-row w-full px-[30%] h-full mt-[5%] justify-between items-center'>
        <div className='w-[40%] outline-1 shadow-md rounded-xl p-4'>
            <form className='flex flex-col' action="/transactions" method="POST" onSubmit={submitForm}>
            <p className='text-xl font-semibold'>Fast Input</p>
            <CustomInput forLabel="amount" idLabel="amount" label="Amount ($)" name="amount" type="number" placeholder="ex : 250" onChange={handleInput}/>
            <label htmlFor="options">Type</label>
            <Select onValueChange={(value) => handleChange("status", value)} required>
                <SelectTrigger className="w-[full]">
                    <SelectValue placeholder="Income / Expense" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Income" >Income</SelectItem>
                    <SelectItem value="Expense" >Expense</SelectItem>
                </SelectContent>
            </Select>
            <label htmlFor="options2">Category</label>
            <Select onValueChange={(value) => handleChange("category", value)}>
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
            <CustomInput label="Description" forLabel="description" idLabel="description" type="text" name="description" placeholder="What is this for ?" onChange={handleInput}/>
            <button className='bg-black text-white px-4 py-1.5 rounded-lg mt-4' >
                Add
            </button>
            </form>
        </div>
        <div className='w-[40%] outline-1 shadow-md rounded-xl p-4 flex-col flex gap-4 h-[350px]'>
            <h2 className='text-end text-xl font-bold mb-2'>Review</h2>
            <div className='flex flex-row justify-between'>
            <p className='font-semibold'>Type</p>
            <p>{transaction.type ? transaction.type : "-"}</p>
            </div>
            <div className='flex flex-row justify-between'>
            <p className='font-semibold'>Category</p>
            <p>{transaction.category ? transaction.category : "-"}</p>
            </div>
            <div className='flex flex-row justify-between'>
            <p className='font-semibold'>Amount</p>
            <p>{transaction.amount ? transaction.amount : 0}</p>
            </div>
            <p className='font-semibold'>Description</p>
            <p>{transaction.description ? transaction.description : "You haven't add income or expense"}</p>
        </div>
    </div>
  )
}

export default page