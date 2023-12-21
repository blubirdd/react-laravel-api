import React from 'react'

function Loading() {
    return (
        <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-gray-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default Loading