import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import Header from './Header';
import Navbar from './Navbar';

interface Props {
  withNavbar: boolean;
}
const Dashboard: React.FC<Props> = ({ withNavbar }) => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      padding="md"
      styles={(theme) => ({
        main: { backgroundColor: theme.colors.gray[0] },
      })}
      navbar={{ width: withNavbar ? 300 : 0, breakpoint: 'xs', collapsed: { mobile: !opened } }}
      header={{ height: 72 }}
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Header />
      </AppShell.Header>
      {withNavbar ? (
        <AppShell.Navbar p="md">
          <Navbar />
        </AppShell.Navbar>
      ) : null}
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default Dashboard;
