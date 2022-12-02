import { ResponseDTO } from '../../common/dtos/response.dto';

export const LogoutUserResStub = (): ResponseDTO<null> => {
  return {
    statusCode: 200,
    message: 'User john.doe@mail.com is successfully signed out',
    error: null,
    data: null,
  };
};
