import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import privateApi from '../clients/privateApi';

import { ALL_TASKS_KEY } from './useAllTasks';

const createNewTaskWithAIHelper = async (newTask: { prompt: string }) => {
  await privateApi.post('/tasks/ai-helper', newTask);
};

export const useCreateNewTaskWithAIHelper = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNewTaskWithAIHelper,
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
