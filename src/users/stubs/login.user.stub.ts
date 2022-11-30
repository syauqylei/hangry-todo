import { LoginUserDTO } from '../dtos/login.user.dto';

export const LoginUserStub = (): LoginUserDTO => {
  return {
    email: 'john.doe@mail.com',
    password: 'Abcde_12345',
  };
};
