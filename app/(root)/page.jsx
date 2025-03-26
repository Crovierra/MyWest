import Analysis from '@/components/Analysis'
import Chart from '@/components/Chart'
import Fund from '@/components/Fund'
import Profile from '@/components/Profile'
import StatusCard from '@/components/StatusCard'
import StatusChart from '@/components/StatusChart'
import TransactionTable from '@/components/TransactionTable'
import React from 'react'


const Home = () => {
  return (
    <>
    <div className='px-[20%] max-lg:px-[5%] my-[1%] max-sm:my-[2%] max-xl:px-[10%]'>
      <h2 className='text-xl font-semibold'>Dashboard</h2>
      <Profile />
    </div>
    <div className='flex flex-row w-full px-[20%] max-lg:px-[5%] gap-4 max-md:flex-col max-xl:px-[10%]'>
      <div className='flex flex-col w-[75%] mb-4 max-md:w-[100%]'>
        <div className='flex flex-row gap-5 '>
      <StatusCard status="Income" cash="$ 3680" percentage="15%"/>
      <StatusCard status="Expense" cash="$ 2225" percentage="5%"/>
      <StatusCard status="Balance" cash="$ 1455" percentage="10%"/>
        </div>
      <Analysis />
      <div className='outline-1 rounded-xl my-2 p-4 h-full shadow-lg'>
        <TransactionTable scrollClass="h-[400px] w-full"/> 
      </div>
    </div>
    <div className='flex-col flex w-[25%] my-2 gap-4 max-md:hidden'>
        <div className='outline-1 h-[25%] rounded-xl max-xl:h-[30%] shadow-md'>
          <Fund />
        </div>
        <div className='flex flex-col h-[75%] rounded-xl gap-4'>
          <Chart />
          <StatusChart />
        </div>
    </div>
    </div>
    </>
  )
}

export default Home