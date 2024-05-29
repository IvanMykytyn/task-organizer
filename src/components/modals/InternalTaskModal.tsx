import React, { ReactNode } from 'react';
import { Badge, Flex, Modal, Text } from '@mantine/core';

import { InternalTask } from '../../types/tasks';
import { getSourceDetails } from '../TaskCard';

interface InternalTaskModalProps {
  task: InternalTask;
  opened: boolean;
  onClose: () => void;
}
const getPriority: Record<string, ReactNode> = {
  None: <Badge color="gray">None</Badge>,
  Low: <Badge color="cyan">Low</Badge>,
  Medium: <Badge color="yellow">Medium</Badge>,
  High: <Badge color="red">High</Badge>,
};

const InternalTaskModal: React.FC<InternalTaskModalProps> = ({ task, opened, onClose }) => {
  return (
    <Modal opened={opened} onClose={onClose} title={task.title} size={'lg'}>
      <Flex gap={12} direction={'column'}>
        {task.description && <Text size="lg">Description: {task.description}</Text>}
        {task.priority ? getPriority[task.priority] ?? null : null}
        {getSourceDetails(task.source)}
      </Flex>
    </Modal>
  );
};

export default InternalTaskModal;
