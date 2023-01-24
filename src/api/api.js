import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.API_URL,
  timeout: 5000,
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
