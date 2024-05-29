import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Anchor, Button, Container, Paper, PasswordInput, TextInput, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import publicApi from '../../clients/publicApi';
import { routes } from '../../constants/routes';

const validationSchema = Yup.object({
  full_name: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
});

const initialValues = {
  full_name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const signupUser = async (values: { full_name: string; email: string; password: string }) => {
  const response = await publicApi.post('/users/signup', values);
  return response.data;
};

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const mutation = useMutation(signupUser, {
    onSuccess: () => {
      notifications.show({
        title: 'Success',
        message: 'You have signed up successfully!',
      });
      navigate(routes.auth.login);
    },
    onError: () => {
      notifications.show({
        title: 'Error',
        message: 'Signup failed. Please try again.',
      });
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      mutation.mutate({
        full_name: values.full_name,
        email: values.email,
        password: values.password,
      });
    },
  });

  return (
    <Container size={420} my={40}>
      <Title ta="center">Sign Up</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={formik.handleSubmit}>
          <TextInput
            label="Full Name"
            placeholder="Your full name"
            {...formik.getFieldProps('full_name')}
            error={formik.touched.full_name && formik.errors.full_name ? formik.errors.full_name : null}
            required
          />
          <TextInput
            label="Email"
            placeholder="you@example.com"
            mt="md"
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
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            mt="md"
            {...formik.getFieldProps('confirmPassword')}
            error={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : null}
            required
          />
          <Button fullWidth mt="xl" type="submit" loading={mutation.isLoading}>
            Sign Up
          </Button>
        </form>
        <Anchor href={routes.auth.login} ta="center" mt="md">
          Already have an account? Log in
        </Anchor>
      </Paper>
    </Container>
  );
};

export default SignupPage;
