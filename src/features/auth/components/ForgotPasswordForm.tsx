'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  forgotPasswordSchema,
  forgotPasswordType,
} from '../schemas/forgot-password-schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/SubmitButton';
import Link from 'next/link';
import { formatRootMessageFormError } from '@/utils/format-form-root-error';
import FormSuccessMessage from '@/components/FormSuccessMessage';
import FormRootMessage from '@/components/FormRootMessage';
import { resetPassword } from '../actions/reset-password-action';

const ForgotPasswordForm = () => {
  const [message, setMessage] = useState<undefined | string>(
    undefined
  );

  const form = useForm<forgotPasswordType>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const handleFormSubmit = async (data: forgotPasswordType) => {
    setMessage(undefined);

    try {
      const res = await resetPassword(data);

      if (res?.message) setMessage(res.message);
    } catch (err) {
      form.setError('root', {
        message: formatRootMessageFormError(err),
      });
    }
  };

  return (
    <Card className="sm:w-[400px] w-[90%] shadow-lg rounded-xl bg-white p-6">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold text-gray-800">
          Forgot your password?
        </CardTitle>
        <CardDescription className="text-center text-sm text-gray-500">
          Enter your email address to receive a password reset link.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-y-4"
            onSubmit={form.handleSubmit((data) =>
              handleFormSubmit(data)
            )}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Email address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormSuccessMessage message={message} />

            <FormRootMessage
              message={form.formState.errors.root?.message}
            />

            <CardFooter className="p-0">
              <SubmitButton
                isDisabled={form.formState.isSubmitting}
                label="Send reset email"
                className="w-full"
              />
            </CardFooter>

            <div className="mt-4 text-center">
              <Link
                href={'/auth/login'}
                className="text-sm text-blue-600 hover:underline"
              >
                Back to login
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;
