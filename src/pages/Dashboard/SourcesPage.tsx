import { FC } from 'react';
import { FiSettings } from 'react-icons/fi';
import { MdOutlineAssignment } from 'react-icons/md';
import { ActionIcon, Button, Card, Center, Container, Divider, Flex, Image, Loader, Text } from '@mantine/core';

import tickTickLogoSrc from '../../assets/icons/tick_tick-logo.webp';
import { useActivateSource } from '../../hooks/useActivateSource';
import { useSources } from '../../hooks/useSources';
import { useUsersMe } from '../../hooks/useUsersMe';
import { SourceType } from '../../types/sources';

export const SourcesPage: FC = () => {
  const { data: user, isLoading } = useUsersMe();
  const { data: userSources, isLoading: isSourcesLoading } = useSources();
  const { mutate: activateSource } = useActivateSource();
  const tickTickUrl = new URL('/tick-tick/auth/start', 'http://localhost:3020');
  tickTickUrl.searchParams.append('email', user?.email ?? '');

  const sources = [
    {
      type: SourceType.TICK_TICK,
      name: 'Tick Tick',
      url: tickTickUrl.toString(),
      logo: <Image src={tickTickLogoSrc} width={75} height={75} />,
      isActive: userSources?.map((source) => source.type).includes(SourceType.TICK_TICK),
    },
    {
      type: SourceType.INTERNAL,
      name: 'Internal',
      url: '',
      logo: <MdOutlineAssignment size={80} />,
      isActive: userSources?.map((source) => source.type).includes(SourceType.INTERNAL),
    },
  ] as const;

  if (isLoading || isSourcesLoading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }
  return (
    <Container>
      <Flex gap={20} wrap={'wrap'}>
        {sources.map((item) => {
          return (
            <Card shadow="sm" padding="lg" radius="md" withBorder h="200px" w="280px" opacity={item.isActive ? '1' : '0.5'}>
              <Card.Section p={15}>
                <Center>{item.logo}</Center>
                <Text ta="center">{item.name}</Text>
              </Card.Section>

              <Divider />
              <Card.Section h={70}>
                <Flex align={'center'} justify={'center'} gap={20} p={10}>
                  <Button variant="outline" size="sm" onClick={() => window.open(item.url)}>
                    Connect
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => activateSource(item.type)}>
                    Activate
                  </Button>
                  <ActionIcon variant="transparent">
                    <FiSettings size={28} />
                  </ActionIcon>
                </Flex>
              </Card.Section>
            </Card>
          );
        })}
      </Flex>
    </Container>
  );
};
