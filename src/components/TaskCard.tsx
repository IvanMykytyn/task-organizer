import React, { ReactNode, useState } from 'react';
import { FiLink } from 'react-icons/fi';
import { MdOutlineAssignment } from 'react-icons/md';
import { ActionIcon, Flex, Image, Paper, Text } from '@mantine/core';

import tickTickLogoSrc from '../assets/icons/tick_tick-logo.webp';
import { SourceType } from '../types/sources';
import { InternalTask, Task, TickTickTask } from '../types/tasks';

import InternalTaskModal from './modals/InternalTaskModal';
import TickTickTaskModal from './modals/TickTickTaskModal';
import InternalTaskComp from './tasks/InternalTask';
import TickTickTaskComp from './tasks/TickTickTask';

interface TaskCardProps {
  task: Task;
}

const getSourceIcon: Record<SourceType, ReactNode> = {
  [SourceType.TICK_TICK]: <Image src={tickTickLogoSrc} width={20} height={20} />,
  [SourceType.INTERNAL]: <MdOutlineAssignment size={20} />,
};

const getSourceName: Record<SourceType, string> = {
  [SourceType.TICK_TICK]: 'Tick Tick',
  [SourceType.INTERNAL]: 'Internal',
};
export const getSourceDetails = (source: SourceType) => {
  return (
    <Flex gap={5} align={'center'}>
      {getSourceIcon[source]}
      <Text>{getSourceName[source]}</Text>
    </Flex>
  );
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [modalOpened, setModalOpened] = useState(false);

  const handleOpenModal = () => setModalOpened(true);
  const handleCloseModal = () => setModalOpened(false);

  const renderTaskComponent = () => {
    switch (task.source) {
      case 'tick_tick':
        return <TickTickTaskComp task={task as TickTickTask} />;
      case 'internal':
        return <InternalTaskComp task={task as InternalTask} />;
      default:
        return <Paper>Unknown source</Paper>;
    }
  };

  const renderTaskModal = () => {
    switch (task.source) {
      case 'tick_tick':
        return <TickTickTaskModal task={task as TickTickTask} opened={modalOpened} onClose={handleCloseModal} />;
      case 'internal':
        return <InternalTaskModal task={task as InternalTask} opened={modalOpened} onClose={handleCloseModal} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Paper
        pos="relative"
        h={120}
        shadow="sm"
        radius={10}
        withBorder
        onClick={handleOpenModal}
        p={'10px 15px'}
        style={{ cursor: 'pointer', overflow: 'hidden' }}
      >
        <Paper pos="absolute" left={0} top={0} bottom={0} bg={task?.color ?? 'gray'} w={'3px'} radius={'px'} />
        <Flex h="100%" direction={'column'} justify={'space-between'}>
          {renderTaskComponent()}
          <Flex justify={'space-between'}>
            {getSourceDetails(task.source)}
            <ActionIcon
              variant="outline"
              component="a"
              disabled={!Boolean(task.url)}
              target="_blank"
              rel="noopener noreferrer"
              href={task.url}
              aria-label="Open in a new tab"
              onClick={(event) => event.stopPropagation()}
            >
              <FiLink />
            </ActionIcon>
          </Flex>
        </Flex>
      </Paper>
      {renderTaskModal()}
    </>
  );
};

export default TaskCard;
