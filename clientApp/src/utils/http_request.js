import axios from 'axios';

const URL_API_DEV = 'https://pele-marreta.herokuapp.com';

const instance = axios.create({
  baseURL: URL_API_DEV
});

instance.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
instance.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

instance.interceptors.request.use(async config => {
  const token = 'getToken()';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
