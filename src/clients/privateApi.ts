import axios from 'axios';

import { BASE_URL } from '../constants/api';
import { getFromLocalStorage } from '../utils/localStorage';

const privateApi = axios.create({
  baseURL: BASE_URL,
});

privateApi.interceptors.request.use((config: any) => {
  const apiToken = getFromLocalStorage('token');

  return {
    ...config,
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  };
});

export default privateApi;
