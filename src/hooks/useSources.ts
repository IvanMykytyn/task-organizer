import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import privateApi from '../clients/privateApi';
import { Source } from '../types/sources';

const getSources = async () => {
  const response: AxiosResponse<Source[]> = await privateApi.get('/sources/all');
  return response.data;
};

export const SOURCES_KEY = 'sources';

export const useSources = () => {
  return useQuery({
    queryFn: getSources,
    queryKey: [SOURCES_KEY],
  });
};
