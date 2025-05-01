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

import { useForm } from 'react-hook-form';
import {
  resetPasswordSchema,
  resetPasswordType,
} from '../schemas/reset-password-schema';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import SubmitButton from '@/components/SubmitButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { newPassword } from '../actions/new-password-action';
import Link from 'next/link';
import { formatRootMessageFormError } from '@/utils/format-form-root-error';
import FormRootMessage from '@/components/FormRootMessage';
import ShowPassword from './ShowPassword';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type ConfirmEmailProps = {
  token: string;
};

const ResetPasswordForm = ({ token }: ConfirmEmailProps) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<resetPasswordType>({
    defaultValues: {
      token: token,
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const handleFormSubmit = async (data: resetPasswordType) => {
    try {
      const res = await newPassword(data);

      if (res?.message) {
        toast(res.message);

        router.push('/auth/login');
      }
      if (res.error) {
        form.setError('root', {
          message: res.error,
        });
      }
    } catch (err) {
      form.setError('root', {
        message: formatRootMessageFormError(err),
      });
    }
  };

  return (
    <Card className="sm:w-[400px] w-[90%]">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold text-gray-800">
          Reset Your Password
        </CardTitle>
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                      placeholder="Enter new password"
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
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
              label="Show passwords"
            />

            <FormRootMessage
              message={form.formState.errors.root?.message}
            />

            <SubmitButton
              label="Reset Password"
              isDisabled={form.formState.isSubmitting}
              className="w-full"
            />
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <Link
          href={'/auth/login'}
          className="w-full text-center text-blue-600 hover:underline text-sm"
        >
          Back to login
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ResetPasswordForm;
