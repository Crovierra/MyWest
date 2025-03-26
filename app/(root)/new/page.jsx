"use client"

import CustomInput from '@/components/CustomInput'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { useState, useEffect } from "react"
  import { useUser } from '@/lib/action/user-context'
import { useRouter } from 'next/navigation'


const page = () => {
    const { user } = useUser();
    const router = useRouter();
    const [ loading, setLoading ] = useState(false)
    useEffect(()=>{
        if(!user){
            router.push("/")
        }
    }, [])
    const [isIncome, setIsIncome] = useState(true)
        function handleChange(key,value){
            if(key === "status"){
                setIsIncome(value === "Income")
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
        user: user?.name || "",
        userId: user?.userId || "",
        amount: 0,
        status: "",
        category: "",
        description: ""
    })

    async function submitForm(e){
        e.preventDefault()
        const newTransaction = {
            userId: user?.userId,
            date: new Date().toISOString().split("T")[0], // Add current date
            status: transaction.status,
            category: transaction.category,
            description: transaction.description,
            amount: transaction.amount
        }
        
        try {
            
            setLoading(true)
            const response = await fetch(`/api/transactions/${newTransaction.id}`,{
                method: "POST",
                headers: {"Content-Type" :"application/json"},
                body: JSON.stringify(newTransaction)
            })
            console.log("The transaction: ",newTransaction)
            
            const data = await response.json();
    
            setTransaction((prev) => ({
                ...prev,
                userId:user.userId,
                amount: 0,
                description: ""
            }))
            if(response.ok){
                alert("Sucess")
            }
        } catch (error) {
            console.log("There is an error when submiting form :", error)
        } finally {
            setLoading(false)
        }
        
        
    }


  return (
    <div className='flex flex-row w-full px-[30%] h-full mt-[5%] justify-between items-center'>
        <div className='w-[40%] outline-1 shadow-md rounded-xl p-4'>
            <form className='flex flex-col' action="/transactions" method="POST" onSubmit={submitForm}>
            <p className='text-xl font-semibold'>Add New</p>
            <CustomInput forLabel="amount" idLabel="amount" label="Amount ($)" name="amount" type="number" placeholder="ex : 250" onChange={handleInput}/>
            <label htmlFor="options">Status</label>
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
            <button className='bg-black text-white px-4 py-1.5 rounded-lg mt-4 cursor-pointer' disabled={loading}>
                {loading ? "Loading . . " : "Add"}
            </button>
            </form>
        </div>
        <div className='w-[40%] outline-1 shadow-md rounded-xl p-4 flex-col flex gap-4 h-[350px]'>
            <h2 className='text-end text-xl font-bold mb-2'>Review</h2>
            <div className='flex flex-row justify-between'>
            <p className='font-semibold'>Status</p>
            <p>{transaction.status ? transaction.status : "-"}</p>
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