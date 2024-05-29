import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import privateApi from '../clients/privateApi';
import { CreateNewTaskParams } from '../types/tasks';

import { ALL_TASKS_KEY } from './useAllTasks';

const createNewTaskManually = async (newTask: CreateNewTaskParams) => {
  await privateApi.post('/tasks/manual', newTask);
};

export const useCreateNewTaskManually = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNewTaskManually,
    onSuccess: () => {
      notifications.show({
        title: 'Success',
        message: 'You have created task successfully!',
      });
      queryClient.invalidateQueries([ALL_TASKS_KEY]);
    },
    onError: () => {
      notifications.show({
        title: 'Error',
        message: 'Task Creation failed. Please try again.',
      });
    },
  });
};
