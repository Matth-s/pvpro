'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/SubmitButton';
import { signupSchema, signupType } from '../schemas/signup-schema';
import AuthFormLinkFooter from './AuthFormLinkFooter';
import { signupAction } from '../actions/signup-action';
import { formatRootMessageFormError } from '@/utils/format-form-root-error';
import FormRootMessage from '@/components/FormRootMessage';
import FormSuccessMessage from '@/components/FormSuccessMessage';
import ShowPassword from './ShowPassword';

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>(
    undefined
  );
  const form = useForm<signupType>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(signupSchema),
  });

  const isLoading = form.formState.isSubmitting;
  const formError = form.formState.errors.root?.message;

  const handleFormSubmit = async (data: signupType) => {
    setMessage(undefined);
    try {
      const res = await signupAction(data);

      if (res?.error)
        return form.setError('root', {
          message: res.error,
        });

      if (res?.message) return setMessage(res.message);
    } catch (err) {
      form.setError('root', {
        message: formatRootMessageFormError(err),
      });
    }
  };

  return (
    <Card className="w-[90%] sm:w-[400px]">
      <CardHeader>
        <CardTitle>Signup</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              handleFormSubmit(data)
            )}
            className="flex flex-col gap-y-4"
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      autoComplete="username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ShowPassword
              showPassword={showPassword}
              setShowPassword={() => setShowPassword((prev) => !prev)}
              label="Show password"
            />

            {message && <FormSuccessMessage message={message} />}
            {formError && <FormRootMessage message={formError} />}

            <SubmitButton isDisabled={isLoading} label="Signup" />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="">
        <AuthFormLinkFooter
          label="Already have account ?"
          href="/auth/login"
          labelHref="Sign in"
        />
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
