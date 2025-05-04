import { Rcon } from 'rcon-client';

export const sendRconCommand = async (command: string) => {
  const rcon = await Rcon.connect({
    host: process.env.RCON_HOST!,
    port: Number(process.env.RCON_PORT),
    password: process.env.RCON_PASSWORD!,
  });

  const response = await rcon.send(command);
  await rcon.end();

  return response;
};
