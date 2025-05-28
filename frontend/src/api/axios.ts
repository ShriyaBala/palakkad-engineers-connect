import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

export default API;

// src/api/axios.ts (add this after creating the axios instance)
API.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken'); // use the same key as you store JWT with
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
