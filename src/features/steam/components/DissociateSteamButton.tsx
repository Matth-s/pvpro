'use client';

import SubmitButton from '@/components/SubmitButton';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  dissociateSteamSchema,
  dissociateSteamType,
} from '../schemas/dissocate-steam-schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { dissociateSteamAction } from '../actions/dissociate-steam-action';
import { formatRootMessageFormError } from '@/utils/format-form-root-error';
import FormRootMessage from '@/components/FormRootMessage';
import { useState } from 'react';

type DissociateSteamButtonProps = {
  steamId: string;
};

const DissociateSteamButton = ({
  steamId,
}: DissociateSteamButtonProps) => {
  console.log(steamId);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<dissociateSteamType>({
    defaultValues: {
      steamId,
      confirm: '',
    },
    resolver: zodResolver(dissociateSteamSchema),
  });
  const formRootError = form.formState.errors.root?.message;
  const isPending = form.formState.isSubmitting;

  const confirmValue = form.watch('confirm') as string;
  const isInvalid = confirmValue !== 'delete';

  const handleFormSubmit = async (data: dissociateSteamType) => {
    try {
      await dissociateSteamAction(data);

      toast('Steam has been dissociated');

      setIsOpen(false);
    } catch (err) {
      form.setError('root', {
        message: formatRootMessageFormError(err),
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => setIsOpen((prev) => !prev)}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Dissociate Steam</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dissociate Steam</DialogTitle>
          <DialogDescription>
            Type <span className="font-bold">delete</span> to unsync
            your Steam account.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              handleFormSubmit(data)
            )}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {formRootError && (
              <FormRootMessage message={formRootError} />
            )}

            <DialogFooter>
              <SubmitButton
                isDisabled={isPending || isInvalid}
                label="Delete Steam"
                className="w-full"
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DissociateSteamButton;
