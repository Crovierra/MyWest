"use client"

import { SlGraph } from "react-icons/sl";
import { useUser } from "@/lib/action/user-context";
import { useState, useEffect } from "react"
import { useTransaction } from "@/lib/action/transaction-context"

const StatusCard = ({status, cash, percentage}) => {
  const { user } = useUser();
  const [isClient, setClient] = useState(false)
  const [ transactions, setTransactions] = useState({
    income: 0,
    expense: 0,
    balance: 0,
    percentageIncome: 0,
    percentageExpense: 0,
    percentageBalance: 0,
  })
  const { income, expense, balance} = useTransaction()

  useEffect(()=>{
    setClient(true)
  }, [])
    
    useEffect(()=>{
      const inc = Math.floor((income / (income + expense)) * 100)
      const exp = Math.floor((expense / (income + expense))* 100)
      const bnc = Math.floor((balance / income)* 100)
      setTransactions({
          income: income,
          expense: expense,
          balance: balance,
          percentageIncome: inc,
          percentageExpense: exp,
          percentageBalance: bnc,
        })
    }, [income, expense, balance])

   if(!isClient) return null;
    
  return (
    <>
      {status === "Income" ? (
        <div className="bg-green-400 flex flex-row w-[300px] h-[140px] shadow-md  rounded-xl py-2 px-5 max-sm:px-4 max-sm:w-[100%]">
        <div className="flex flex-col w-[70%] items-start justify-center">
        <p className=''><span className="bg-white px-2 text-green-500 rounded-xl font-bold">{user ? transactions.percentageIncome : percentage}{transactions ? "%" : null}</span></p>
        <p className='font-semibold text-xl mt-[5%] max-sm:text-center'>Total Income</p>
        <p className="font-semibold max-sm:text-center">{user ? transactions.income : cash}</p>
        </div>
        <div className="w-[30%] justify-center mt-[10%] flex">
                <SlGraph className="text-4xl text-green-800 max-sm:hidden"/>
            </div>      
        </div>
      ): status === "Expense" ? (
        <div className="bg-red-400 flex flex-row w-[300px] h-[140px] shadow-md  rounded-xl py-2 px-5 max-sm:px-4 max-sm:w-[100%]">
        <div className="flex flex-col w-[70%] items-start justify-center">
        <p className=''><span className="bg-white px-2 text-red-500 rounded-xl font-bold">{user ? transactions.percentageExpense : percentage}{transactions ? "%" : null}</span></p>
        <p className='font-semibold text-xl mt-[5%] max-sm:text-center'>Total Expense</p>
        <p className="font-semibold max-sm:text-center">{user ? transactions.expense : cash}</p>
        </div>
        <div className="w-[30%] justify-center mt-[10%] flex">
                <SlGraph className="text-4xl text-red-800 max-sm:hidden"/>
            </div>      
        </div>
      ) : (
        <div className="bg-blue-400 flex flex-row w-[300px] h-[140px] shadow-md  rounded-xl py-2 px-5 max-sm:px-4 max-sm:w-[100%]">
        <div className="flex flex-col w-[70%] items-start justify-center max-sm:items-center">
        <p className=''><span className="bg-white px-2 text-blue-500 rounded-xl font-bold">{user ? transactions.percentageBalance : percentage}{transactions ? "%" : null}</span></p>
        <p className='font-semibold text-xl mt-[5%] max-sm:text-center'>Total Balance</p>
        <p className="font-semibold">{user ? transactions.balance : cash}</p>
        </div>
        <div className="w-[30%] justify-center mt-[10%] flex">
                <SlGraph className="text-4xl text-blue-800 max-sm:hidden"/>
            </div>      
        </div>
      )}
    </>
  )
}

export default StatusCard

export const IncomeCard = () =>{
  return(
    <div className={incomeBg}>
        <div className="flex flex-col w-[70%] items-start justify-center">
        <p className=''><span className={incomeTxt}>{transactions.length > 0 ? "1" : percentage}</span></p>
        <p className='font-semibold text-xl mt-[5%]'>Total </p>
        <p className="font-semibold">{transactions.length > 0 ? 1000 : cash}</p>
        </div>
        <div className="w-[30%] justify-center mt-[10%] flex">
            <SlGraph className={green}/>
        </div>      
    </div>
)
}