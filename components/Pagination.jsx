import React from 'react'

const Pagination = ({setCurrentPage, totalTransaction, transactionPerPage}) => {
    const pages = []
    for (let i = 1; i <= Math.ceil(totalTransaction/transactionPerPage); i++){
        pages.push(i)
    }

  return (
    <div className='flex flex-row gap-3'>
    {pages.map((item, index) =>{
        return (
            <button key={index} onClick={() => setCurrentPage(item)}
            className="btn outline-1 px-2 rounded-full cursor-pointer">{item}</button>
        )
    })}
    </div>
  )
}

export default Pagination