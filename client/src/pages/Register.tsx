import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../queries/AddUser';
import '../styles/Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [addUser, { data, loading, error }] = useMutation(ADD_USER);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUser({ variables: { userInput: { username, password } } });
  };

  if (data) return <p>Registered successfully, welcome {data.addUser.username}!</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( Please try again</p>;

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;