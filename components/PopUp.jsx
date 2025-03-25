"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
  } from "@/components/ui/dialog"
  import { MdOutlineModeEditOutline } from "react-icons/md";
import CustomInput from "./CustomInput";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useUser } from "@/lib/action/user-context";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

 
  const PopUp = ({data, fn, submitEdit, deleteTransactionById, deleteTemp, setDeleteId}) => {
    const { user } = useUser()
    const [ loading, setLoading ] = useState(false)
    const [ oldTransaction, setOldTransaction ] = useState({
        userId: data.userId,
        id: data.id,
        date: data.date,
        status: data.status,
        description: data.description,
        category: data.category,
        amount: data.amount
    })
    const [ tempTransaction, setTempTransaction ] = useState({
        userId: data.userId,
        id: data.id,
        date: data.date,
        status: data.status,
        description: data.description,
        category: data.category,
        amount: data.amount
    })
    const [ newTransaction, setNewTransaction ] = useState({})
    function handleChange(e){
        const { name, value } = e.target
        setOldTransaction(prevValue => {
            return {...prevValue, [name]: value}
        })
    }
    function handleTempChange(e){
        const { name, value } = e.target
        setOldTransaction(prevValue => {
            return {...prevValue, [name]:value}
        })
    }

    function handleChanged(key, value){
        setOldTransaction(prevValue => {
            return {...prevValue, [key]:value}
        })
    }

    function deleteTemporary(){
        deleteTemp(tempTransaction.id)
    }

    async function deleteTransaction(){
        try {
            if(!user){
                console.log("User not found")
            }
            setLoading(true)
            const token = sessionStorage.getItem("token")
            setDeleteId(oldTransaction.id)
            const response = await fetch(`/api/transactions/${oldTransaction.id}`,
                {
                    method: "DELETE",
                    headers: {"Content-Type" : "application/json",
                        Authorization : `Bearer ${token}`
                    },
                    body: JSON.stringify(oldTransaction)
                }
            )
            
            if(response.ok){
                alert("Success")
            }
        } catch (error) {
            console.log("Failed to delete data", error)
        } finally {
            setLoading(false)
        }
 
    }

    function fakeSubmit(){
        try {
            setLoading(true)
            console.log("Fake submit for temporary data")
            submitEdit(oldTransaction)
            alert("Success")
        } catch (error) {
            console.log("Can't submit without Sign In First!", error)
        } finally {
            setLoading(false)
        }
    }

    async function submitNew(){
        try {
            const token = sessionStorage.getItem("token")
            setLoading(true)
        if(!token){
            console.log("Invalid Token")
        }
        const response = await fetch(`/api/transactions/${oldTransaction.id}`,
                {
                    method: "PUT",
                    headers: {"Content-Type" : "application/json",
                        Authorization : `Bearer ${token}`
                    },
                    body: JSON.stringify(oldTransaction)
                }
            )            

            if(!response.ok){
                console.log("Failed to update data :", response)
                alert("Failed to update data")
                return;
            }
            const newData = await response.json()
            console.log("New Data :", newData.transaction)
            if(newData){
                submitEdit(newData.transaction)
            }
            alert("Success Updating Data")
            setOldTransaction({
                userId: data.userId || 0,
                id: data.id,
                date: data.date,
                status: data.status,
                description: data.description || data.desc,
                category: data.category,
                amount: data.amount
            })
        } catch (error) {
            console.log("Error updating data :", error.message)
        } finally {
            setLoading(false)
        }

    }


    return (
      <div>
        {fn === "edit" ? (
            <Dialog>
                <DialogTrigger>
                    <MdOutlineModeEditOutline className="text-2xl cursor-pointer"/>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Edit</DialogTitle>
                <DialogDescription>
                    Make changes to your data here. Click save when you're done.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="status" className="text-right">Status</label>
            <Select onValueChange={(value) => handleChanged("status", value)} required>
            <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Income / Expense" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Income" >Income</SelectItem>
                <SelectItem value="Expense" >Expense</SelectItem>
            </SelectContent>
            </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="category" className="text-right">Category</label>
            <Select onValueChange={(value) => handleChanged("category", value)}>
            <SelectTrigger className="w-[120px]">
                <SelectValue placeholder={oldTransaction.status === "Income" ? "Salary, Bonus, etc" : "Food, Entertaiment, etc"} />
            </SelectTrigger>
            {oldTransaction.status === "Income" ? (
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
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="text-right">Description</label>
            <CustomInput
                idLabel="description" 
                type="text"
                placeholder="What is it for ?"
                name="description"
                onChange={user ? handleChange : handleTempChange}
                value={oldTransaction ? oldTransaction?.description : data.description}
                className="w-[250px]"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="amount" className="text-right">Amount</label>
            <CustomInput
                idLabel="amount" 
                type="number"
                placeholder="ex : $ 300"
                name="amount"
                onChange={user ? handleChange : handleTempChange}
                value={oldTransaction ? oldTransaction?.amount : data.amount}
                className="w-[250px]"/>
            </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <button type="submit" className="btn bg-black text-white rounded-2xl py-1 px-2 cursor-pointer shadow-md" onClick={user ? submitNew : fakeSubmit} disabled={loading}>{loading ? "Loading . . ." : "Save Changes"}</button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
        </Dialog>
        ) : (
            <Dialog>
                <DialogTrigger>
                <MdDeleteForever className="text-2xl cursor-pointer"/>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Delete</DialogTitle>
                <DialogDescription>
                    Are you sure to delete this transaction ?
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose asChild>
                <button type="submit" className="btn bg-black text-white rounded-2xl py-1 px-2 cursor-pointer shadow-md" onClick={user ? deleteTransaction : deleteTemporary} disabled={loading}>{loading ? "Loading . . ." : "Confirm"}</button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
        </Dialog>
        )}
    </div>
    )
  }
  
  export default PopUp