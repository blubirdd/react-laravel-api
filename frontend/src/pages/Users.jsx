import React from 'react'
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

import TableHeader from '../components/headers/TableHeader.jsx';
import Loading from '../components/Loading.jsx';
import UserList from '../components/Lists/UserList.jsx';
import Pagination from '../components/Pagination.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const { setNotification } = useStateContext();
  const [confirmDialog, setConfirmDialog] = useState(null);

  useEffect(() => {
    getUsers();
  }, [pagination.currentPage]);

  const onDelete = (user) => {
    setConfirmDialog({
      message: 'Are you sure you want to delete '+ user.email +'?',
      onConfirm: () => handleDeleteConfirmed(user.id),
      onCancel: () => setConfirmDialog(null),
    });
  };


  const handleDeleteConfirmed = (userID) => {
    axiosClient.delete(`/users/${userID}`)
      .then(() => {
        setNotification('User successfully deleted');
        getUsers();
      })
      .finally(() => {
        setConfirmDialog(null);
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

      {confirmDialog && (
        <ConfirmDialog
          message={confirmDialog.message}
          onConfirm={confirmDialog.onConfirm}
          onCancel={confirmDialog.onCancel}
        />
      )}

      {!loading &&
        <div className="users">
          <TableHeader
            title="Users"
            createLink="/admin/users/new"
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