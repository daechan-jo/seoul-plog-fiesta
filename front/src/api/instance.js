import axios from 'axios';

const baseURL = 'http://34.64.122.168:3001';

const userToken = () => localStorage.getItem('userToken');

export const instance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userToken()}`,
  },
});

instance.interceptors.request.use(
  (config) => {
    console.log('인터셉트해버리기');
    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = `Bearer ${userToken()}`;
    return config;
  }, (error)=>{
    console.log('에러를 인터셉트해버리기') 
    return Promise.reject(error);
  }
);

export const formDataInstance = axios.create({
  baseURL,
  timeout: 3000,
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${userToken()}`,
  },
});

const formDataInstanceInterceptor = formDataInstance.interceptors.request.use(
  (config) => {
    console.log('폼 인터셉트해버리기')
    return config;
  }, (error)=>{
    console.log('폼 에러를 인터셉트해버리기') 
    return Promise.reject(error);
  }
);

formDataInstance.interceptors.request.eject(formDataInstanceInterceptor);