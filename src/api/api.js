import axios from 'axios';

import store from '@/plugins/store/store.js';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

instance.interceptors.request.use((config) => {
  const email = store.getState().user.email;
  config.headers = {
    ...config.headers,
    'X-User': email,
  };
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.statusCode === 401) {
      throw new Response('', {
        status: err.statusCode,
      });
    }

    return Promise.reject(err);
  },
);

export default instance;
