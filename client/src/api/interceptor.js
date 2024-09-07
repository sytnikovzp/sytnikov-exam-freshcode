import axios from 'axios';
// =============================================
import constants from '../constants';
// =============================================
import history from '../browserHistory';

const instance = axios.create({
  baseURL: constants.BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(constants.AUTH.ACCESS_TOKEN);
    if (token) {
      config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
    }
    return config;
  },
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (response) => {
    if (response.data.token) {
      localStorage.setItem(constants.AUTH.ACCESS_TOKEN, response.data.token);
    }
    return response;
  },
  (err) => {
    if (
      err.response &&
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
