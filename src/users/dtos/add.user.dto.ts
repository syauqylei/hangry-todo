/* eslint */
import { IsEmail, Matches, Max, MaxLength, MinLength } from 'class-validator';
import { PASSWORD_REGEX } from '../../common/constants';

export class AddUserDTO {
  @IsEmail()
  email: string;

  @MaxLength(20)
  firstName: string;

  @MaxLength(20)
  lastName: string;

  @Matches(PASSWORD_REGEX)
  password: string;
}
