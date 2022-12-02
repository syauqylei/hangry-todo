import { IsJWT } from 'class-validator';

export class LogoutUserDTO {
  @IsJWT()
  token: string;
}
