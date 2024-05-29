import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import privateApi from '../clients/privateApi';
import { User } from '../types/users';

const getMe = async () => {
  const response: AxiosResponse<User> = await privateApi.get('/users/me');
  return response.data;
};

export const USERS_ME_KEY = 'users_me';

export const useUsersMe = () => {
  return useQuery({
    queryFn: getMe,
    queryKey: [USERS_ME_KEY],
  });
};
