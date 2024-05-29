import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import privateApi from '../clients/privateApi';
import { Task } from '../types/tasks';

const getAllTasks = async (disabledSources?: string | null, query?: string | null) => {
  const response: AxiosResponse<Task[]> = await privateApi.get(
    `/tasks?disabled_sources=${disabledSources ? disabledSources : ''}&q=${query ? query : ''}`,
  );
  return response.data;
};

export const ALL_TASKS_KEY = 'all_tasks';

export const useAllTasks = (disabledSources?: string | null, query?: string | null) => {
  return useQuery({
    queryFn: () => getAllTasks(disabledSources, query),
    queryKey: [ALL_TASKS_KEY, disabledSources, query],
  });
};
