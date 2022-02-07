import { existsSync } from 'fs';
import { resolve } from 'path';

export function getEnvFile(): string {
  const envMode = process.env.NODE_ENV;
  const envFile = `.env.${envMode}`;
  const envFilePath = resolve(process.cwd(), envFile);
  const envFileDefault = '.env';

  if (!envMode) {
    return envFileDefault;
  }

  if (existsSync(envFilePath)) {
    return envFile;
  }

  return envFileDefault;
}
