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
  

const Fund = () => {
    const [isIncome, setIsIncome] = useState(true)
    function handleChange(value){
        setIsIncome(value === "income")
    }

  return (
    <div className='flex flex-col p-4 gap-2'>
        <form className='flex flex-col' action="/transactions" method="POST">
        <p className='text-xl font-semibold'>Fast Input</p>
        <CustomInput forLabel="amount" idLabel="amount" label="Amount ($)" name="amount" type="text" placeholder="ex : 250"/>
        <label for="options">Type</label>
        <Select onValueChange={handleChange} required>
            <SelectTrigger className="w-[full]">
                <SelectValue placeholder="Income / Expense" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Income" >Income</SelectItem>
                <SelectItem value="Expense" >Expense</SelectItem>
            </SelectContent>
        </Select>
        <label for="options2">Category</label>
        <Select>
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
        <button className='bg-black text-white px-4 py-1.5 rounded-lg mt-4'>
            Add
        </button>
        </form>

    </div>
  )
}

export default Fund