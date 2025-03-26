"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {useState, useEffect} from "react"
  import { useUser } from "@/lib/action/user-context"
  import PopUp from "@/components/PopUp"
  import { useTransaction } from "@/lib/action/transaction-context"
  import { ScrollArea } from "@/components/ui/scroll-area"
import Pagination from "./Pagination"

const TransactionTable = ({scrollClass}) => {

  const { user } = useUser();
  const {getTotalIncome, getTotalExpense, getTotalBalance, getCategoryExpense} = useTransaction();
  const [ transactions, setTransactions] = useState([])
  const [ isClient, setClient] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [transactionPerPage, setTransactionPerPage] = useState(7)

  const income = "bg-green-500 rounded-2xl pb-0.5 px-4 text-white"
  const expense = "bg-red-500 rounded-2xl pb-0.5 px-4 text-white"
  const [temporaryData, setTemporaryData] = useState([{
    id: 1,
    date:"12/10/2025",
    status: "Income",
    description: "Salary",
    category: "Salary",
    amount: 1250
  },
  {
    id: 2,
    date:"15/10/2025",
    status: "Expense",
    description: "Buying Mc Donalds",
    category: "Food",
    amount: 250
  },
  {
    id: 3,
    date:"16/10/2025",
    status: "Expense",
    description: "Dinner date with girlfriend",
    category: "Date",
    amount: 1050
  },
  {
    id: 4,
    date:"18/10/2025",
    status: "Income",
    description: "Gift from family",
    category: "Gift",
    amount: 200
  },
  {
    id: 5,
    date:"21/10/2025",
    status: "Income",
    description: "Overtime bonus from work",
    category: "Bonus",
    amount: 150
  },
  {
    id: 6,
    date:"1/11/2025",
    status: "Expense",
    description: "Buy Monster Hunter Wild in steam",
    category: "Entertaiment",
    amount: 80
  },
  {
    id: 7,
    date:"2/11/2025",
    status: "Expense",
    description: "Buy oversize t-shirt from uniqlo",
    category: "Clothes",
    amount: 45
  },
  {
    id: 8,
    date:"1/11/2025",
    status: "Income",
    description: "Capital gain from investment",
    category: "Bonus",
    amount: 2080
  },
  {
    id: 9,
    date:"1/11/2025",
    status: "Expense",
    description: "Apartmen monthly",
    category: "Rent",
    amount: 800
  },])
  
  const lastIndex = currentPage * transactionPerPage
  const firstIndex = lastIndex - transactionPerPage
  const currentTransaction = transactions.slice(firstIndex, lastIndex)

  function deleteById(id){
    if(user){
      setTransactions(prevValue =>{
        return prevValue.filter(item => {
          return item.id !== id
        })
      })
    } else {
      setTemporaryData(prevValue => {
        return prevValue.filter(item => {
          return item.id !== id
        })
      })
    }
  }

  function editTransaction(data){
    if(user){
      setTransactions(prevValue => {
        return prevValue.map(item => item.id === data.id ? data : item)
      })
    } else {
      setTemporaryData(prevValue => {
        return prevValue.map(item => item.id === data.id ? data : item)
      })
    }
  }

  
  
  useEffect(()=> {
    const token = sessionStorage.getItem("token")
    if(!token){
      return;
    }
    const fetchData = async () => {
      try {
      
      const response = await fetch("/api/transactions", {
        method: "GET",
        headers: {
          "content-type":"application/json",
          Authorization:`Bearer ${token}`,
        }
      })

      if(!response.ok){
        throw new Error(`Error ${response.status} : ${response.statusText}`)
      }
      
      const data = await response.json()
      
      setTransactions(data)
      const filterIncome = data.filter(item => item.status === "Income").reduce((sum, item) => sum += Number(item.amount), 0)
      getTotalIncome(filterIncome)
      const filterExpense = data.filter(item => item.status === "Expense").reduce((sum, item) => sum += Number(item.amount), 0)
      getTotalExpense(filterExpense)
      const totalBalance = filterIncome - filterExpense
      getTotalBalance(totalBalance)
      
      const rent = data.filter(item => item.category === "Rent").reduce((sum, item) => sum += Number(item.amount),0)
      const entertaiment = data.filter(item => item.category === "Entertaiment").reduce((sum, item) => sum += Number(item.amount),0)
      const clothes = data.filter(item => item.category === "Clothes").reduce((sum, item) => sum += Number(item.amount),0)
      const food = data.filter(item => item.category === "Food").reduce((sum, item) => sum += Number(item.amount),0)
      const study = data.filter(item => item.category === "Study").reduce((sum, item) => sum += Number(item.amount),0)
      getCategoryExpense({
        rent: rent,
        entertaiment: entertaiment,
        clothes: clothes,
        food: food,
        study: study
      })
      
    } catch (error) {
      console.log("Error fetching transactions from database :", error)
    }
    }
   
    if (user) fetchData();
  }, [user])
    
  useEffect(()=>{
    setClient(true)
    
  }, [])
  if(!isClient) return null;
  
  return (
    <>
    <div>
        <Table>
            <TableHeader>
             <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead className="w-[10%]">Date</TableHead>
                <TableHead className="w-[10%]">Status</TableHead>
                <TableHead className="w-[10%]">Category</TableHead>
                <TableHead className="w-[70%]">Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
             <TableBody>
              {/* Map Data */}
              {(user ? currentTransaction || [] : temporaryData).map(item => (
                    <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id || item.invoice}</TableCell>
                   <TableCell>{user ? item.date?.split("T")[0] : item.date}</TableCell>
                    <TableCell><span className={item.status === "Income" ? income : expense}>{item.status}</span></TableCell>
                   <TableCell>{item.category}</TableCell>
                   <TableCell >{item.description}</TableCell>
                    <TableCell className="text-right">$ {item.amount}</TableCell>
                    <TableCell className="flex flex-row">
                    <PopUp data={item} fn="edit" submitEdit={editTransaction}/>
                    <PopUp data={item} fn="delete" deleteTempTransaction={deleteById} setDeleteId={deleteById}/>
                    </TableCell>
                    </TableRow>
              ))}
            </TableBody>
        </Table>
            <div className="relative flex w-full justify-center bottom-0 mt-[1%]">
              <Pagination setCurrentPage={setCurrentPage} transactionPerPage={transactionPerPage} totalTransaction={transactions.length}/>
            </div>
    </div>
    </>
  )
}

export default TransactionTable