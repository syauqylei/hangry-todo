export const isDevEnvironment = (): boolean => {
  if (process.env.NODE_ENV === 'PRODUCTION') {
    return false;
  }
  return true;
};
