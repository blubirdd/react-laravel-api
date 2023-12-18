import React from 'react'
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import Loading from '../components/Loading.jsx';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext()

  useEffect(() => {
    getUsers();
  }, [])

  const onDelete = user => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return
    }
    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        setNotification('User successfully deleted')
        getUsers()
      })
  }

  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/users')
      .then(({ data }) => {
        setLoading(false)
        setUsers(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Users</h1>
      <div className="flex justify-between items-center py-3">
        <Link to="/users/new" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-teal-500 text-white hover:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#create-user">
          <svg className="fill-slate-100" xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
          Create New
        </Link>

        <div className="flex items-center gap-2 ps-2">
          <span class="inline-flex justify-center items-center w-[46px] h-[46px] rounded-md bg-neutral-50 border border-neutral-200 cursor-pointer hover:bg-white">
            <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h14M1 6h14M1 11h7" />
            </svg>
          </span>
          <div class="relative">
            <input type="text" class="py-3 px-4 ps-11 block w-auto bg-neutral-150 border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Search users" />
            <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
              <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border rounded-lg overflow-hidden dark:border-gray-700">
              <table className="min-w-full z-10 divide-y divide-gray-200 dark:divide-gray-700 bg-gray-50">
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-800 uppercase dark:text-gray-400">ID</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase dark:text-gray-400">Name</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase dark:text-gray-400">Email</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase dark:text-gray-400">Date created</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase dark:text-gray-400">Action</th>
                  </tr>
                </thead>
                {loading &&
                  <tbody>
                    <tr>
                      <td colSpan="5" className="text-center p-5">
                        <Loading />
                      </td>
                    </tr>
                  </tbody>
                }
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {users.map(user => (
                    <tr key={user.id}>
                      <td className="py-3 whitespace-nowrap text-center text-sm text-gray-800 dark:text-gray-200">{user.id}</td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{user.name}</td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{user.email}</td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{user.created_at}</td>
                      <td className="px-6 py-2 whitespace-nowrap space-x-1 text-sm font-medium">
                        <Link to={'/users/' + user.id}>
                          <button type="button" className="py-1 px-2 inline-flex items-center bg-opacity-80 bg-op text-sm font-semibold rounded-lg border border-transparent bg-sky-900 text-gray-200 hover:bg-sky-800 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                            Edit
                          </button>
                        </Link>
                        <button onClick={ev => onDelete(user)} type="button" className="py-1 px-2 inline-flex items-center bg-opacity-80  text-sm font-semibold rounded-lg border border-transparent bg-red-700 text-gray-200 hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Users