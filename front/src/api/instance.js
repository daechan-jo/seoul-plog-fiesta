import axios from 'axios';

const baseURL = 'http://34.64.122.168:3001';
//const baseURL = 'http://localhost:3001';

const userToken = () => localStorage.getItem('userToken');

export const instance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userToken()}`,
  },
});

export const formDataInstance = axios.create({
  baseURL,
  timeout: 3000,
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${userToken()}`,
  },
});
