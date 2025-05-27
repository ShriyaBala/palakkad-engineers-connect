import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await API.post('register/', { username, password });
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      alert('Registration failed. Try another username.');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Join Us</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Join</button>
    </form>
  );
};

export default Register;
