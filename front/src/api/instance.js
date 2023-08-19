import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
  },
});

export const formDataInstance = axios.create({
  baseURL: 'http://localhost:5001/',
  timeout: 3000,
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
  },
});
