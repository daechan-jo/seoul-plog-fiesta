import axios from 'axios';

const baseURL = 'http://34.64.122.168:3001';

export const instance = axios.create({
  baseURL,
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem('userToken');

    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = `Bearer ${userToken}`;

    // refreshToken 요청
    
    return config;
  }, (error)=>{
    console.log('에러를 인터셉트해버리기') 
    return Promise.reject(error);
  }
);

export const formDataInstance = axios.create({
  baseURL,
  timeout: 3000,
});

formDataInstance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem('userToken');

    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = `Bearer ${userToken}`;
    return config;
  }, (error)=>{
    console.log('폼 에러를 인터셉트해버리기') 
    return Promise.reject(error);
  }
);