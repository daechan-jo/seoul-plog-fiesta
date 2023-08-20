import { formDataInstance, instance } from './instance';

const get = async (endpoint, params = '') => {
  try {
    console.log(`GET: /${endpoint}/params`);
    const res = await instance.get(endpoint + '/' + params);
    return res;
  } catch (err) {
    console.error('GET ERROR', err);
    throw err;
  }
};

const post = async (endpoint, data) => {
  try {
    console.log(`POST: ${process.env.REQUEST_URL}${endpoint}`);
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
    console.log(`POST: ${process.env.REQUEST_URL}${endpoint}`);
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
    console.log(`POST: ${process.env.REQUEST_URL}${endpoint}`);
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
    console.log(`PUH: ${process.env.REQUEST_URL}${endpoint}`);
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
    console.log(`DELTE: ${process.env.REQUEST_URL}${endpoint}/params`);
    const res = await instance.delete(endpoint + '/' + params);
    return res;
  } catch (err) {
    console.error('DELETE ERROR', err);
    throw err;
  }
};
export { get, post, registerPost, postForm, put, del as delete };
