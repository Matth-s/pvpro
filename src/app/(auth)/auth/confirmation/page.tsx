import ConfirmEmail from '@/features/auth/components/ConfirmEmail';
import MissingConfirmationToken from '@/features/auth/components/MissingConfirmationToken';

type AuthConfirmationPageProps = {
  searchParams: Promise<{
    token?: string;
  }>;
};

const AuthConfirmationPage = async ({
  searchParams,
}: AuthConfirmationPageProps) => {
  const token = (await searchParams).token;

  if (!token) return <MissingConfirmationToken />;

  return <ConfirmEmail token={token} />;
};

export default AuthConfirmationPage;
