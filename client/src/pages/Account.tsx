import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../queries/GetUserById';
import '../styles/Account.css';

const Account = () => {
  const userId = localStorage.getItem('userId');
  console.log("UserID from localStorage:", userId);
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { id: userId },
    skip: !userId,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data?.user;

  return (
    <div className="account-container">
      <h1>Account Details</h1>
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Role: {user.role}</p>
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default Account;
