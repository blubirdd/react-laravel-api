import React from 'react'

function Notification({ message }) {
  return (
    <div className="fixed bottom-0 right-0 max-w-xs m-5 bg-teal-500 text-sm text-white font-semibold rounded-md shadow-lg" role="alert">
      <div className="flex p-4">
        { message }
      </div>
    </div>
  )
}

export default Notification