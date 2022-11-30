import { ResponseDTO } from '../../common/dtos/response.dto';

export const SignUpResStub = (): ResponseDTO<null> => {
  return {
    statusCode: 201,
    message: 'User john.doe@mail.com is successfully registered',
    data: null,
    error: null,
  };
};
