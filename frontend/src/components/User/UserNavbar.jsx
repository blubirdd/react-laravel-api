import React from 'react';
import { Link } from 'react-router-dom';

function UserNavbar() {

  return (
    <>
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b text-sm py-1 sm:py-2 dark:bg-slate-900 dark:border-gray-700">
        <nav className="flex basis-full items-center w-full mx-auto px-4 sm:px-6 lg:px-8" aria-label="Global">
          <div className="w-full flex items-center justify-end ">
            <div className="flex flex-row items-center justify-end gap-2">
              <Link to="/login">
                <button>Login</button>
              </Link>
              <Link to="/signup">
                <button>Register</button>
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default UserNavbar