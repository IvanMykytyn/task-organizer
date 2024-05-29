import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import privateApi from '../clients/privateApi';
import { SourceType } from '../types/sources';

import { SOURCES_KEY } from './useSources';

const activateSource = async (source_id: SourceType) => {
  await privateApi.post(`sources/${source_id}/activate`);
};

export const useActivateSource = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: activateSource,
    onSuccess: () => {
      notifications.show({
        title: 'Success',
        message: 'You have activated source successfully!',
      });
      queryClient.invalidateQueries([SOURCES_KEY]);
    },
    onError: () => {
      notifications.show({
        title: 'Error',
        message: 'Source Activation failed. Please try again.',
      });
    },
  });
};
