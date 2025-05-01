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
import { loginSchema, loginType } from '../schemas/login-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/SubmitButton';
import { loginAction } from '../actions/login-action';
import FormRootMessage from '@/components/FormRootMessage';
import { formatRootMessageFormError } from '@/utils/format-form-root-error';
import AuthFormLinkFooter from './AuthFormLinkFooter';
import FormSuccessMessage from '@/components/FormSuccessMessage';
import OptInput from './OptInput';
import BackButtonAuthForm from './BackButtonAuthForm';
import ShowPassword from './ShowPassword';
import ForgotPasswordLink from './ForgotPasswordLink';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>(
    undefined
  );
  const form = useForm<loginType>({
    defaultValues: {
      usernameOrEmail: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const isLoading = form.formState.isSubmitting;
  const formError = form.formState.errors.root?.message;

  const handleBackOtp = (): void => {
    setShowTwoFactor(false);
    form.setError('root', {
      message: undefined,
    });
    form.setError('code', {
      message: undefined,
    });
    form.setValue('code', undefined);
  };

  const handleFormSubmit = async (data: loginType): Promise<void> => {
    setMessage(undefined);

    try {
      const res = await loginAction(data);

      if (res?.message) return setMessage(res.message);
      if (res?.twoFactor) return setShowTwoFactor(true);

      if (res?.error) {
        return form.setError('root', {
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
    <Card className="w-[90%] sm:w-[400px]">
      <CardHeader>
        {showTwoFactor && (
          <BackButtonAuthForm onCLick={() => handleBackOtp()} />
        )}
        <CardTitle>
          {showTwoFactor ? 'Verify code' : 'Login'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              handleFormSubmit(data)
            )}
            className="flex flex-col gap-y-4"
          >
            {showTwoFactor ? (
              <FormField
                name="code"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-fit mx-auto">
                    <FormControl>
                      <OptInput field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <>
                <FormField
                  name="usernameOrEmail"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email or username</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          autoComplete="new-email"
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
                          autoComplete="new-password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <ForgotPasswordLink />

                <ShowPassword
                  showPassword={showPassword}
                  setShowPassword={() =>
                    setShowPassword((prev) => !prev)
                  }
                  label="Show password"
                />
              </>
            )}

            {message && <FormSuccessMessage message={message} />}
            {formError && <FormRootMessage message={formError} />}

            <SubmitButton
              isDisabled={isLoading}
              label={showTwoFactor ? 'Verify' : 'Login'}
            />
          </form>
        </Form>
      </CardContent>
      {!showTwoFactor && (
        <CardFooter>
          <AuthFormLinkFooter
            label="Don't have an account ?"
            href="/auth/signup"
            labelHref="Sign up"
          />
        </CardFooter>
      )}
    </Card>
  );
};

export default LoginForm;
