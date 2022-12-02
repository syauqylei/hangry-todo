import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { LogoutUserStub } from '../stubs/user.logout.stub';
import { LogoutUserDTO } from './logout.user.dto';

describe('Testing LogoutUserDTO', () => {
  let payload: LogoutUserDTO;

  beforeEach(() => {
    payload = LogoutUserStub();
  });

  it('should throw error when token is not in jwt format', async () => {
    payload.token = 'asd';
    const req = plainToClass(LogoutUserDTO, payload);
    const err = await validate(req);
    expect(err.length).toBeTruthy();
  });
});
