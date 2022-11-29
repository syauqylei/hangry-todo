/* eslint */
import { IsEmail, Max, MaxLength, MinLength } from 'class-validator';

export class AddUserDTO {
  @IsEmail()
  email: string;

  @MaxLength(20)
  firstName: string;

  @MaxLength(20)
  lastName: string;

  @MinLength(8)
  password: string;
}
