import React from 'react'
import { Link } from 'react-router-dom'

function UserList({ users, onDelete }) {
  return (
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
                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase dark:text-gray-400">Role</th>
                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase dark:text-gray-400">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="py-3 whitespace-nowrap text-center text-sm text-gray-800 dark:text-gray-200">{user.id}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{user.name}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{user.email}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{user.created_at}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{user.role.toUpperCase()}</td>
                  <td className="px-6 py-2 whitespace-nowrap space-x-1 text-sm font-medium">
                    <Link to={'/admin/users/' + user.id}>
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
  )
}

export default UserList