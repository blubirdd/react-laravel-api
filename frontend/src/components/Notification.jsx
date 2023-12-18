import React from 'react'

function Notification({ message }) {
  return (
    <div class="fixed bottom-0 right-0 max-w-xs m-5 bg-teal-500 text-sm text-white font-semibold rounded-xl shadow-lg" role="alert">
      <div class="flex p-4">
        { message }
      </div>
    </div>
  )
}

export default Notification