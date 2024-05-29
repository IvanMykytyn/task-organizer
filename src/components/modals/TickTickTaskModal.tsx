import React, { ReactNode } from 'react';
import { Badge, Flex, Modal, Text } from '@mantine/core';

import { TickTickTask } from '../../types/tasks';
import { getSourceDetails } from '../TaskCard';

interface Props {
  task: TickTickTask;
  opened: boolean;
  onClose: () => void;
}
const getPriority: Record<number, ReactNode> = {
  0: <Badge color="gray">None</Badge>,
  1: <Badge color="cyan">Low</Badge>,
  3: <Badge color="yellow">Medium</Badge>,
  5: <Badge color="red">High</Badge>,
};

const TickTickTaskModal: React.FC<Props> = ({ task, opened, onClose }) => {
  const title = `${task.project} / ${task?.parent ? task.parent + ' / ' : ''}  ${task.title}`;
  return (
    <Modal opened={opened} onClose={onClose} title={title} size={'lg'}>
      <Flex gap={12} direction={'column'}>
        {task.project && <Text size="lg">List: {task.project}</Text>}
        {task.description && <Text size="lg">Description: {task.description}</Text>}
        {task.tags.map((tag) => (
          <Badge size="md">{tag}</Badge>
        ))}
        {task.priority ? getPriority[task.priority] ?? null : null}
        {getSourceDetails(task.source)}
      </Flex>
    </Modal>
  );
};

export default TickTickTaskModal;
