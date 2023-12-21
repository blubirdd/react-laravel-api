import React from 'react'
import { Link } from 'react-router-dom'

function PostList({ posts, onDelete }) {
  return (
    <div className="flex flex-col">
    <div className="-m-1.5 overflow-x-auto">
      <div className="p-1.5 min-w-full inline-block align-middle">
        <div className="border rounded-lg overflow-hidden dark:border-gray-700">
          <table className="min-w-full z-10 divide-y divide-gray-200 dark:divide-gray-700 bg-gray-50">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th scope="col" className="w-1 px-3 py-3 text-center text-xs font-medium text-gray-800 uppercase dark:text-gray-400">ID</th>
                <th scope="col" className="w-1/4 px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase dark:text-gray-400">Title</th>
                <th scope="col" className="w-1/2 px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase dark:text-gray-400">Description</th>
                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase dark:text-gray-400">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {posts.map(post => (
                <tr key={post.id} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                  <td className="py-3 whitespace-nowrap text-center text-sm text-gray-800 dark:text-gray-200">{post.id}</td>
                  <td className="px-6 py-3 whitespace-normaltext-sm text-gray-800 dark:text-gray-200">{post.title}</td>
                  <td className="px-6 py-3 whitespace-normal text-sm text-gray-800 dark:text-gray-200">{post.description}</td>
                  <td className="px-6 py-2 whitespace-nowrap space-x-1 text-sm font-medium">
                    <Link to={'/admin/posts/' + post.id}>
                      <button type="button" className="py-1 px-2 inline-flex items-center bg-opacity-80 bg-op text-sm font-semibold rounded-lg border border-transparent bg-sky-900 text-gray-200 hover:bg-sky-800 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        Edit
                      </button>
                    </Link>
                    <button onClick={ev => onDelete(post)} type="button" className="py-1 px-2 inline-flex items-center bg-opacity-80  text-sm font-semibold rounded-lg border border-transparent bg-red-700 text-gray-200 hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
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

export default PostList