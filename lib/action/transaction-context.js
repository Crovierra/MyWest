"use client"
import { createContext, useContext, useState } from "react"

const TransactionContext = createContext()

export const TransactionProvider = ({children}) => {
    const [ income, setIncome ] = useState(0)
    const [ expense, setExpense ] = useState(0)
    const [ balance, setBalance ] = useState(0)
    const [categoryExpense, setCategoryExpense] = useState([])
    

    const getTotalIncome = (data) =>{
        setIncome(data)
    }

    const getTotalExpense = (data) =>{
        setExpense(data)
    }

    const getTotalBalance = (data) =>{
        setBalance(data)
    }

    const getCategoryExpense = (data) =>{
        setCategoryExpense(data)
    }
    
    return (
        <TransactionContext value={{getTotalIncome, getTotalExpense, getTotalBalance,getCategoryExpense,categoryExpense, income, expense, balance}}>
            {children}
        </TransactionContext>
    )
}

export const useTransaction = () => useContext(TransactionContext)