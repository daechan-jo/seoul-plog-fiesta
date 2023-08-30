import axios from 'axios';

const baseURL = process.env.SERVER_URL;

const userToken = () => localStorage.getItem('userToken');

export const instance = axios.create({
  baseURL,
  timeout: 3000,
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
