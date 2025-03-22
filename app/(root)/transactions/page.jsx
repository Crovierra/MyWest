import TransactionTable from '@/components/TransactionTable'
import React from 'react'

const transactions = () => {
  return (
    <div className='w-full px-[10%] max-sm:px-[5%] mt-[2%] flex flex-col'>
        <div>
          
        </div>
        <div className='flex flex-col items-center my-[2%]'>
        <h2 className='font-bold'>Transaction Detail</h2>
        </div>
        <TransactionTable />
    </div>
  )
}

export default transactions