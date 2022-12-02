import { LogoutUserDTO } from '../dtos/logout.user.dto';
import { JWTTokenStub } from './token.stub';

export const LogoutUserStub = (): LogoutUserDTO => {
  return {
    token: JWTTokenStub(),
  };
};
