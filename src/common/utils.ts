export const getEnvVar = (key: string, defaultValue: string): string => {
  return process.env[key] || defaultValue;
};
