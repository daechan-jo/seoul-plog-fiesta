import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const instance = axios.create({
  baseURL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
  },
});

export const formDataInstance = axios.create({
  baseURL,
  timeout: 3000,
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
  },
});
