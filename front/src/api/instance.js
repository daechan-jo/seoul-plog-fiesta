import axios from 'axios';

const baseURL = process.env.REQUEST_URL;

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
