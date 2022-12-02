import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { LoginUserStub } from '../stubs/user.login.stub';
import { LoginUserDTO } from './login.user.dto';

describe('Testing LoginUserDTO', () => {
  let payload: LoginUserDTO;
  beforeEach(() => {
    payload = LoginUserStub();
  });

  it('should throw error when email is a valid email', async () => {
    payload.email = 'john.doe';
    const req = plainToClass(LoginUserDTO, payload);
    const error = await validate(req);
    expect(error).toBeDefined();
  });

  it('should throw error when password less than 8 chars', async () => {
    payload.password = 'aaaa';
    const req = plainToClass(LoginUserDTO, payload);
    const error = await validate(req);
    expect(error).toBeDefined();
  });

  it('should throw error when password has no uppercase', async () => {
    payload.password = 'aaaa';
    const req = plainToClass(LoginUserDTO, payload);
    const error = await validate(req);
    expect(error).toBeDefined();
  });

  it('should throw error when password has no special chars', async () => {
    payload.password = 'aaaa';
    const req = plainToClass(LoginUserDTO, payload);
    const error = await validate(req);
    expect(error).toBeDefined();
  });

  it('should throw error when password has no lowercase', async () => {
    payload.password = 'AAAA';
    const req = plainToClass(LoginUserDTO, payload);
    const error = await validate(req);
    expect(error).toBeDefined();
  });

  it('should throw error when password has no number', async () => {
    payload.password = 'AAAA';
    const req = plainToClass(LoginUserDTO, payload);
    const error = await validate(req);
    expect(error).toBeDefined();
  });
});
