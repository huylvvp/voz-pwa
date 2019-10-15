// @flow
import axios from 'axios';

export const BASE_API_URL: string = `${process.env.REACT_APP_BASE_API_URL || 'localhost:3000'}`;

const customAxios = axios.create({
  baseURL: BASE_API_URL,
});

customAxios.interceptors.response.use(
  response => response,
  error => {
    // Add logic to handle error here

    return Promise.reject(error);
  },
);

export default { customAxios };
