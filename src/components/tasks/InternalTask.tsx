import React from 'react';
import { Flex, Text, Title } from '@mantine/core';

import { InternalTask } from '../../types/tasks';

interface Props {
  task: InternalTask;
}

const InternalTaskComponent: React.FC<Props> = ({ task }) => {
  return (
    <Flex direction={'column'}>
      <Title order={5}>{task.title}</Title>
      <Text>{task?.description}</Text>
    </Flex>
  );
};

export default InternalTaskComponent;
