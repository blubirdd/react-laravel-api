import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from '../../axios-client.js';
import { useStateContext } from "../../context/ContextProvider.jsx";
import Loading from '../../components/others/Loading.jsx';

function UserForm() {

  const navigate = useNavigate();
  let { id } = useParams();
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const { setNotification } = useStateContext()
  const [originalUser, setOriginalUser] = useState(null);

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false)
          setUser(data)
          setOriginalUser(data);
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (user.id) {
      axiosClient.put(`/users/${user.id}`, user)
        .then(() => {
          setNotification('User successfully updated')
          navigate('/admin/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.post('/users', user)
        .then(() => {
          setNotification('User successfully created')
          navigate('/admin/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <>
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Loading />
        </div>
      )}
      {errors &&
        <div className="alert">
          {Object.keys(errors).map(key => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>
      }
      {!loading && (
        <>
          {user.id && <h1 className="text-xl p-2 font-bold"> Update user:&nbsp;
            <span className="font-normal">
              {originalUser && originalUser.name}
            </span>
          </h1>
          }

          {!user.id &&
            <h1 className="text-xl p-2 font-bold">Creat new user</h1>
          }
          <div className="flex flex-col  max-w-2xl p-4 bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <form onSubmit={onSubmit}>
              <div className="p-2 overflow-y-auto">
                <label className="block text-sm font-medium mb-2 dark:text-white">Name</label>
                <input type="text"
                  className="py-3 px-4 block w-full rounded-md text-sm border border-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder="Enter name"
                  value={user.name}
                  onChange={ev => setUser({ ...user, name: ev.target.value })}
                />
              </div>
              <div className="p-2 overflow-y-auto">
                <label className="block text-sm font-medium mb-2 dark:text-white">Email</label>
                <input
                  type="email"
                  className="py-3 px-4 block w-full rounded-md text-sm border border-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  value={user.email}
                  onChange={ev => setUser({ ...user, email: ev.target.value })}
                  placeholder="Enter email"
                />
              </div>
              <div className="p-2 overflow-y-auto">
                <label className="block text-sm font-medium mb-2 dark:text-white">Password</label>
                <input
                  type="password"
                  className="py-3 px-4 block w-full rounded-md text-sm border border-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  onChange={ev => setUser({ ...user, password: ev.target.value })}
                  placeholder="Enter Password"
                />
              </div>
              <div className="p-2 overflow-y-auto">
                <label className="block text-sm font-medium mb-2 dark:text-white">Confirm password</label>
                <input
                  type="password"
                  className="py-3 px-4 block w-full rounded-md text-sm border border-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  onChange={ev => setUser({ ...user, password_confirmation: ev.target.value })}
                  placeholder="Confirm Password"
                />
              </div>
              <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                <button
                  onClick={() => navigate(-1)}
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-neutral-100 text-gray-800 shadow-sm hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  Cancel
                </button>
                <button type="submit" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  )
}

export default UserForm