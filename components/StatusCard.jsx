import { SlGraph } from "react-icons/sl";

const StatusCard = ({status, cash, percentage}) => {
    const incomeBg = "bg-blue-400 flex flex-row w-[300px] h-[140px] shadow-md  rounded-xl py-2 px-5"
    const expenseBg = "bg-red-400 flex flex-row w-[300px] h-[140px] shadow-md  rounded-xl py-2 px-5"
    const balance = "bg-green-400 flex flex-row w-[300px] h-[140px] shadow-md  rounded-xl py-2 px-5"

    const incomeTxt = "bg-white px-2 text-blue-500 rounded-xl font-bold"
    const expenseTxt ="bg-white px-2 text-red-500 rounded-xl font-bold"
    const balanceTxt = "bg-white px-2 text-green-500 rounded-xl font-bold"

    const blue ="text-4xl text-blue-800"
    const green ="text-4xl text-green-800"
    const red ="text-4xl text-red-800"

    
  return (
    <div className={status === "Income" ? incomeBg : status === "Expense" ? expenseBg : balance}>
        <div className="flex flex-col w-[70%] items-start justify-center">
        <p className=''><span className={status === "Income" ? incomeTxt : status === "Expense" ? expenseTxt : balanceTxt}>{percentage}</span></p>
        <p className='font-semibold text-xl mt-[5%]'>Total {status}</p>
        <p className="font-semibold">{cash}</p>
        </div>
        <div className="w-[30%] justify-center mt-[10%] flex">
            <SlGraph className={status === "Income" ? blue : status === "Expense" ? red : green}/>
        </div>
    </div>
  )
}

export default StatusCard