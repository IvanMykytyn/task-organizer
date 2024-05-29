import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Anchor, Button, Container, Paper, PasswordInput, TextInput, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import publicApi from '../../clients/publicApi';
import { routes } from '../../constants/routes';
import { useAuth } from '../../store/useAuth';
import { addUserToLocalStorage } from '../../utils/user';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const initialValues = {
  email: '',
  password: '',
};

interface UserResponse {
  access_token: string;
}

const loginUser = async (values: { email: string; password: string }): Promise<UserResponse> => {
  const formData = new FormData();
  formData.append('username', values.email);
  formData.append('password', values.password);
  const response = await publicApi.post('/login/access-token', formData);
  return response.data;
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setIsLogged } = useAuth();
  const mutation = useMutation(loginUser, {
    onSuccess: ({ access_token }) => {
      setIsLogged(true);
      addUserToLocalStorage(access_token);
      notifications.show({
        title: 'Success',
        message: 'You have logged in successfully!',
      });
      navigate(routes.home);
    },
    onError: () => {
      notifications.show({
        title: 'Error',
        message: 'Login failed. Please check your credentials.',
      });
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return (
    <Container size={420} my={40}>
      <Title ta="center">Login</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={formik.handleSubmit}>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            {...formik.getFieldProps('email')}
            error={formik.touched.email && formik.errors.email ? formik.errors.email : null}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            {...formik.getFieldProps('password')}
            error={formik.touched.password && formik.errors.password ? formik.errors.password : null}
            required
          />
          <Button fullWidth mt="xl" type="submit" loading={mutation.isLoading}>
            Login
          </Button>
        </form>
        <Anchor href={routes.auth.signup} ta="center" mt="md">
          Don't have an account? Sign up
        </Anchor>
      </Paper>
    </Container>
  );
};

export default LoginPage;
