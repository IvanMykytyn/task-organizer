import React from 'react';
import { Button, ColorPicker, Flex, Modal, Select, Tabs, TagsInput, Text, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import { useCreateNewTaskManually } from '../../hooks/useCreateNewTaskManually';
import { useCreateNewTaskWithAIHelper } from '../../hooks/useCreateNewTaskWithAIHelper';

interface CreateTaskModalProps {
  opened: boolean;
  onClose: () => void;
}

const priorities = ['None', 'Low', 'Medium', 'High'];

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ opened, onClose }) => {
  const { mutate: manualCreate } = useCreateNewTaskManually();
  const { mutate: aiHelperCreate } = useCreateNewTaskWithAIHelper();

  const formManual = useForm({
    initialValues: {
      title: '',
      description: '',
      priority: '',
      color: '',
    },
    validate: {
      title: (value) => (value.length > 0 ? null : 'Title is required'),
      description: (value) => (value.length > 0 ? null : 'Description is required'),
    },
    validateInputOnChange: true,
  });

  const formAI = useForm({
    initialValues: {
      aiInput: '',
    },
    validate: {
      aiInput: (value) => (value.length > 0 ? null : 'Input is required'),
    },
    validateInputOnChange: true,
  });

  const handleSubmitManual = (values: typeof formManual.values) => {
    manualCreate(values);
    formManual.reset();
    onClose();
  };

  const handleSubmitAI = (values: typeof formAI.values) => {
    aiHelperCreate({ prompt: values.aiInput });
    formAI.reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Create New Task" size="lg">
      <Tabs defaultValue="manual">
        <Tabs.List>
          <Tabs.Tab value="manual">Manual</Tabs.Tab>
          <Tabs.Tab value="ai-helper">AI Helper</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="manual" pt="xs">
          <form onSubmit={formManual.onSubmit((values) => handleSubmitManual(values))}>
            <Flex direction={'column'} gap={10}>
              <TextInput label="Title" placeholder="Task Title" required {...formManual.getInputProps('title')} />
              <Textarea
                label="Description"
                minRows={6}
                autosize
                resize="vertical"
                placeholder="Task Description"
                required
                {...formManual.getInputProps('description')}
              />
              <Select label="Priority" placeholder="Select priority" data={priorities} {...formManual.getInputProps('priority')} />
              <TagsInput label="Future Feature: Tags" disabled placeholder="Add tags" {...formManual.getInputProps('tags')} />

              <Flex direction={'column'} gap={2}>
                <Text>Color</Text>
                <ColorPicker
                  {...formManual.getInputProps('color')}
                  format="hex"
                  size="lg"
                  swatches={[
                    '#2e2e2e',
                    '#868e96',
                    '#fa5252',
                    '#e64980',
                    '#be4bdb',
                    '#7950f2',
                    '#4c6ef5',
                    '#228be6',
                    '#15aabf',
                    '#12b886',
                    '#40c057',
                    '#82c91e',
                    '#fab005',
                    '#fd7e14',
                  ]}
                />
              </Flex>

              <Flex justify={'flex-end'} mt="md">
                <Button type="submit">Create Task</Button>
              </Flex>
            </Flex>
          </form>
        </Tabs.Panel>

        <Tabs.Panel value="ai-helper" pt="xs">
          <form onSubmit={formAI.onSubmit((values) => handleSubmitAI(values))}>
            <Textarea
              label="AI Input"
              placeholder="Describe the task"
              required
              autosize
              resize="vertical"
              minRows={12}
              {...formAI.getInputProps('aiInput')}
            />
            <Flex justify="flex-end" mt="md">
              <Button type="submit">Create Task</Button>
            </Flex>
          </form>
        </Tabs.Panel>
      </Tabs>
    </Modal>
  );
};

export default CreateTaskModal;
