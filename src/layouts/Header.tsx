import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { FiLogOut, FiPlus, FiSettings } from 'react-icons/fi';
import { MdOutlineAssignment } from 'react-icons/md';
import { RiPlugLine } from 'react-icons/ri';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ActionIcon, Avatar, Button, Divider, Group, Image, Loader, Menu, Paper, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import tickTickLogoSrc from '../assets/icons/tick_tick-logo.webp';
import CreateTaskModal from '../components/modals/CreateTaskModal';
import { routes } from '../constants/routes';
import { useSources } from '../hooks/useSources';
import { useUsersMe } from '../hooks/useUsersMe';
import { useAuth } from '../store/useAuth';
import { Source, SourceType } from '../types/sources';

const getInitialValues = (sources: Source[], disabledSources: string[]) => {
  return sources.reduce(
    (acc, obj) => {
      acc[obj.type] = !disabledSources.includes(obj.type);
      return acc;
    },
    {} as Record<SourceType, boolean>,
  );
};

const getColorCycle = (name: string) => {
  const colors = ['red', 'blue', 'green', 'orange', 'purple'];
  const charIndex = name.charCodeAt(0) % colors.length;
  return colors[charIndex];
};

const getSourceIcon: Record<SourceType, ReactNode> = {
  [SourceType.TICK_TICK]: <Image src={tickTickLogoSrc} width={34} height={34} />,
  [SourceType.INTERNAL]: <MdOutlineAssignment size={34} />,
};

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { data: user, isLoading: isUserLoading } = useUsersMe();
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalOpened, setModalOpened] = useState(false);

  const openModal = () => setModalOpened(true);
  const closeModal = () => setModalOpened(false);

  const { data: sources, isLoading } = useSources();
  const disabledSources = searchParams.get('disabledSources')?.split(',') ?? [];
  const initialValues = sources && !isLoading ? getInitialValues(sources ?? [], disabledSources) : null;

  const [filters, setFilters] = useState(initialValues);
  const [menuOpened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    setFilters(initialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sources]);

  const toggleFilter = (filterName: SourceType) => {
    const newFilters = { ...filters, [filterName]: Boolean(!filters?.[filterName]) } as Record<SourceType, boolean>;
    setFilters(newFilters);
    const newActiveFilters = Object.entries(newFilters ?? []).reduce((acc, [key, value]) => {
      if (!value) {
        acc.push(key);
      }
      return acc;
    }, [] as string[]);
    searchParams.set('disabledSources', newActiveFilters.join(','));
    setSearchParams(searchParams);
  };
  const sourceFilters = useMemo(() => Object.entries(filters ?? []), [filters]);

  return (
    <Paper p="md" shadow="xs" withBorder style={{ display: 'grid', gridTemplateColumns: '1fr auto 220px' }}>
      <Group w="100%" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="subtle" leftSection={<FiPlus />} onClick={openModal}>
          New Task
        </Button>
        <CreateTaskModal opened={modalOpened} onClose={closeModal} />
        <Group>
          {sourceFilters?.length ? (
            sourceFilters.map(([key, value]) => {
              return (
                <ActionIcon
                  key={key}
                  size="lg"
                  color="indigo"
                  opacity={value ? '1' : '0.3'}
                  onClick={() => toggleFilter(key as SourceType)}
                >
                  {getSourceIcon[key as SourceType]}
                </ActionIcon>
              );
            })
          ) : (
            <Loader />
          )}
        </Group>
      </Group>
      <Group px="lg">
        <Divider size="sm" orientation="vertical" />
      </Group>
      <Group style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Group>
          {!isUserLoading && user ? (
            <>
              <Avatar color={getColorCycle(user.full_name)} radius="xl">
                {user.full_name[0]}
              </Avatar>
              <Text style={{ textOverflow: 'ellipsis', maxWidth: '110px', overflow: 'hidden' }}>{user.full_name}</Text>
            </>
          ) : (
            'No User'
          )}
        </Group>
        <Menu opened={menuOpened} onOpen={open} onClose={close}>
          <Menu.Target>
            <Button p={0} pl={5} variant="subtle" leftSection={<FiSettings size={20} />} />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item leftSection={<FiSettings size={24} />}>
              <Text size="lg">Settings</Text>
            </Menu.Item>
            <Menu.Item leftSection={<RiPlugLine size={24} />} onClick={() => navigate(routes.sources)}>
              <Text size="lg">Manage Integrations</Text>
            </Menu.Item>
            <Menu.Item leftSection={<FiLogOut size={24} />} onClick={() => logout()}>
              <Text size="lg">Logout</Text>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Paper>
  );
};

export default Header;
