import { formDataInstance, instance } from './instance';
const baseURL = 'http://localhost:3002';
const userToken = sessionStorage.getItem('userToken');

const get = async (endpoint) => {
  try {
    console.log(`GET: ${baseURL}${endpoint} ${userToken}`);
    const res = await instance.get(endpoint);
    return res;
  } catch (err) {
    console.error('GET ERROR', err);
    throw err;
  }
};

const post = async (endpoint, data) => {
  try {
    console.log(`POST: ${baseURL}${endpoint} ${userToken}`);
    console.log(`DATA: ${JSON.stringify(data)}`);
    const res = await instance.post(endpoint, data);
    return res;
  } catch (err) {
    console.error('POST ERROR', err);
    throw err;
  }
};

const registerPost = async (endpoint, data) => {
  try {
    console.log(`POST: ${baseURL}${endpoint} ${userToken}`);
    console.log(`DATA: ${JSON.stringify(data)}`);
    const res = await instance.post(endpoint, data);
    return res;
  } catch (err) {
    console.error('POST ERROR', err);
    throw err;
  }
};

const postForm = async (endpoint, data) => {
  try {
    console.log(`POST: ${baseURL}${endpoint} ${userToken}`);
    console.log(`DATA: ${JSON.stringify(data)}`);
    const res = await formDataInstance.post(endpoint, data);
    return res;
  } catch (err) {
    console.error('POST ERROR', err);
    throw err;
  }
};

const put = async (endpoint, data) => {
  try {
    console.log(`PUH: ${baseURL}${endpoint} ${userToken}`);
    console.log(`DATA: ${JSON.stringify(data)}`);
    const filteredData = {};
    for (const key in data) {
      if (data[key] !== '') {
        filteredData[key] = data[key];
      }
    }
    console.log(`FILTERED DATA: ${filteredData}`);
    const res = await instance.put(endpoint, filteredData);
    return res;
  } catch (err) {
    console.error('PUT ERROR', err);
    throw err;
  }
};

const del = async (endpoint, params = '') => {
  try {
    console.log(`DELTE: ${baseURL}${endpoint} ${userToken}`);
    const res = await instance.delete(endpoint + '/' + params);
    return res;
  } catch (err) {
    console.error('DELETE ERROR', err);
    throw err;
  }
};
export { get, post, registerPost, postForm, put, del as delete };
