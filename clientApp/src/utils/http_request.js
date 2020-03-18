import axios from 'axios';

const URL_API_DEV = 'https://localhost:44302/';

const instance = axios.create({
  baseURL: URL_API_DEV
});

instance.interceptors.request.use(async config => {
  const token = 'getToken()';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
