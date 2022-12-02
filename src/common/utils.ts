export const isDevEnvironment = (): boolean => {
  if (process.env.NODE_ENV === 'PRODUCTION') {
    return false;
  }
  return true;
};

export const getEnvVar = (key: string, defaultValue: any): string => {
  if (!process.env[key]) {
    return defaultValue;
  }
  return process.env[key] || '';
};
