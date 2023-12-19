import React from 'react'
import { Link } from 'react-router-dom'

function TableHeader(headerData) {

  const title = headerData.title;
  const createLink = headerData.createLink;

  return (
    <>
      <h1 className="text-2xl font-bold">{ title }</h1>
      <div className="flex justify-between items-center py-3">
        <Link to={ createLink } className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-teal-500 text-white hover:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
          <svg className="fill-slate-100" xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
          Create New
        </Link>
        
        <div className="flex items-center gap-2 ps-2">
          <span className="filter-button inline-flex justify-center items-center w-[46px] h-[46px] rounded-md bg-neutral-50 border border-neutral-200 cursor-pointer hover:bg-white">
            <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m2.133 2.6 5.856 6.9L8 14l4 3 .011-7.5 5.856-6.9a1 1 0 0 0-.804-1.6H2.937a1 1 0 0 0-.804 1.6Z" />
            </svg>
          </span>
          <div className="relative">
            <input type="text" className="py-3 px-4 ps-11 block w-auto bg-neutral-150 border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600" 
            placeholder={`Search ${title.toLowerCase()}`} />
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
              <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>  
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TableHeader