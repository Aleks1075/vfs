import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../queries/LoginUser';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data, loading, error }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ variables: { userInput: { username, password } } })
      .then(({ data }) => {
        localStorage.setItem('token', data.login.token);
        localStorage.setItem('role', data.login.user.role);
        localStorage.setItem('userId', data.login.user.id);
        navigate('/shirts');
      })
      .catch((error) => {
        console.error('Login error:', error);
      });
  };  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( Please try again</p>;

  if (data) {
    localStorage.setItem('token', data.login.token);
    return <p>Login successful, welcome {data.login.user.username}!</p>;
  }

  return (
    <div className="login-container">
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;