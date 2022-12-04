export const AuthFailedResStub = () => {
  return {
    statusCode: 401,
    message: 'Authorization header is not provided',
    error: 'Unauthorized',
    data: null,
  };
};
