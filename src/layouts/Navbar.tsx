import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Container, Divider, MultiSelect, Paper, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

const taskStatuses = ['Open', 'In Progress', 'Completed'];
const taskPriorities = ['Low', 'Medium', 'High'];
const taskAssignees = ['Alice', 'Bob', 'Charlie'];

const Navbar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const form = useForm({
    initialValues: {
      search: '',
      status: '',
      priorities: [] as string[],
      assignees: [] as string[],
    },
  });

  const handleFilter = (values: typeof form.values) => {
    searchParams.set('q', values?.search ?? '');
    setSearchParams(searchParams);
  };

  return (
    <Paper p="md">
      <Container>
        <TextInput label="Search" placeholder="Search tasks" {...form.getInputProps('search')} />

        <Select label="Status" placeholder="Select status" data={taskStatuses} mt="md" {...form.getInputProps('status')} />
        <MultiSelect label="Priority" placeholder="Select priorities" data={taskPriorities} mt="md" {...form.getInputProps('priorities')} />
        <MultiSelect label="Assignee" placeholder="Select assignees" data={taskAssignees} mt="md" {...form.getInputProps('assignees')} />
        <Divider my="sm" />

        <Button fullWidth mt="md" onClick={() => handleFilter(form.values)} variant="light">
          Apply Filters
        </Button>
      </Container>
    </Paper>
  );
};

export default Navbar;
