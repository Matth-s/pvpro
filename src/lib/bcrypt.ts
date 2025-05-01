import * as bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) => {
  try {
    const hash = await bcrypt.hash(password, 12);

    return hash;
  } catch {
    throw new Error(
      'Une erreur survenue lors du hachage du mot de passe'
    );
  }
};

export const comparePassword = async (
  password: string,
  hash: string
) => {
  try {
    const correctPassword = await bcrypt.compare(password, hash);

    return correctPassword;
  } catch {
    throw new Error(
      'Une erreur est survenue lors de la comparaison des mots de passe'
    );
  }
};
