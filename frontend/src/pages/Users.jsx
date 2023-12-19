import React from 'react'
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";
import TableHeader from '../components/headers/TableHeader.jsx';
import Loading from '../components/Loading.jsx';
import UserList from '../components/UserList.jsx';
import Pagination from '../components/Pagination.jsx';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const { setNotification } = useStateContext();

  useEffect(() => {
    getUsers();
  }, [pagination.currentPage]);

  const onDelete = (user) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }
    axiosClient.delete(`/users/${user.id}`).then(() => {
      setNotification('User successfully deleted');
      getUsers();
    });
  };

  const getUsers = () => {
    setLoading(true);
    axiosClient
      .get('/users', { params: { page: pagination.currentPage } })
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
        setPagination({
          currentPage: data.meta.current_page,
          totalPages: data.meta.last_page,
        });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {loading &&
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Loading />
        </div>
      }

      {!loading &&
        <div className="users">
          <TableHeader
            title="Users"
            createLink="/users/new"
          
          />
          <UserList
            users={users}
            onDelete={onDelete}
          />
          
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={(page) => setPagination({ ...pagination, currentPage: page })}
          />
        </div>
      }
    </>
  )
}

export default Users