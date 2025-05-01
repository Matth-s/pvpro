export const formatRootMessageFormError = (err: unknown) => {
  if (err instanceof Error) {
    if (err.message === 'NEXT_REDIRECT') return;

    return err.message;
  }

  return 'An error has occurred';
};
