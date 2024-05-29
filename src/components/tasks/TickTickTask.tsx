import React from 'react';
import { Flex, Text, Title } from '@mantine/core';

import { TickTickTask } from '../../types/tasks';

interface Props {
  task: TickTickTask;
}

const TickTickTaskComponent: React.FC<Props> = ({ task }) => {
  return (
    <Flex direction={'column'}>
      <Title order={5}>{`${task.project} / ${task.title}`}</Title>
      <Text>{task?.description}</Text>
    </Flex>
  );
};

export default TickTickTaskComponent;
