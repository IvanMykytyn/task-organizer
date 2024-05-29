import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Center, Container, Flex, Loader } from '@mantine/core';

import TaskCard from '../../components/TaskCard';
import { useAllTasks } from '../../hooks/useAllTasks';

export const HomePage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const disabledSourcesSearchParams = searchParams.get('disabledSources');
  const querySearchParams = searchParams.get('q');
  const [disabledSources, setDisabledSources] = useState(disabledSourcesSearchParams);
  const [query, setQuery] = useState(querySearchParams);
  const { data: tasks, isLoading } = useAllTasks(disabledSources, query);

  useEffect(() => {
    setDisabledSources(disabledSourcesSearchParams);
  }, [disabledSourcesSearchParams]);

  useEffect(() => {
    setQuery(querySearchParams);
  }, [querySearchParams]);

  if (isLoading || !tasks) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }
  return (
    <Container>
      <Flex gap={20} direction={'column'}>
        {tasks.map((task, index) => (
          <TaskCard key={index} task={task} />
        ))}
      </Flex>
    </Container>
  );
};
