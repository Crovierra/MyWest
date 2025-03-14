<<<<<<< HEAD
=======
import Analysis from '@/components/Analysis'
import Fund from '@/components/Fund'
import Profile from '@/components/Profile'
import StatusCard from '@/components/StatusCard'
import TransactionTable from '@/components/TransactionTable'
>>>>>>> 064ffc4 (Creating User Interface)
import React from 'react'

const Home = () => {
  return (
<<<<<<< HEAD
    <div>Hello World</div>
=======
    <>
    <div className='px-[20%] my-[1%]'>
      <h2 className='text-xl font-semibold'>Dashboard</h2>
      <Profile />
    </div>
    <div className='flex flex-row w-full px-[20%] gap-4'>
      <div className='flex flex-col w-[75%]'>
        <div className='flex flex-row gap-5'>
      <StatusCard status="Income"/>
      <StatusCard status="Expense"/>
      <StatusCard status="Balance"/>
        </div>
      <Analysis />
      <div className='outline-1 rounded-xl my-2 p-4 h-[500px]'>
        <TransactionTable />
      </div>
    </div>
    <div className='flex-col flex w-[25%] my-2 gap-4'>
        <div className='outline-1 h-[30%] rounded-xl'>
          <Fund />
        </div>
        <div className='outline-1 h-[70%] rounded-xl'></div>
    </div>
    </div>
    </>
>>>>>>> 064ffc4 (Creating User Interface)
  )
}

export default Home