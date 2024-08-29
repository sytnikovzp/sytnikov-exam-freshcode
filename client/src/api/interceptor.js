import axios from 'axios';
// =============================================
import { BASE_URL, TOKEN_CONFIG } from '../constants';
// =============================================
import history from '../browserHistory';

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem(TOKEN_CONFIG.ACCESS_TOKEN);
    if (token) {
      config.headers = { ...config.headers, Authorization: token };
    }
    return config;
  },
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (response) => {
    if (response.data.token) {
      window.localStorage.setItem(
        TOKEN_CONFIG.ACCESS_TOKEN,
        response.data.token
      );
    }
    return response;
  },
  (err) => {
    if (
      err.response.status === 408 &&
      history.location.pathname !== '/login' &&
      history.location.pathname !== '/registration' &&
      history.location.pathname !== '/'
    ) {
      history.replace('/login');
    }
    return Promise.reject(err);
  }
);

export default instance;
