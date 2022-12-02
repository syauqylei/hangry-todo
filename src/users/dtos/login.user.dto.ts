import { IsEmail, Matches } from 'class-validator';
import { PASSWORD_REGEX } from '../../common/constants';

export class LoginUserDTO {
  @IsEmail()
  email: string;

  @Matches(PASSWORD_REGEX)
  password: string;
}
