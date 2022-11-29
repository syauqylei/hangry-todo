import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { AddUserDTO } from './add.user.dto';

let payload: AddUserDTO;

beforeEach(() => {
  payload = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@mail.com',
    password: 'Abcde_12345',
  };
});

describe('Testing AddUserDTO', () => {
  it('should throw error  \
     when email is not a valid email', async () => {
    payload.email = 'john.doe.mail.com';
    const req = plainToClass(AddUserDTO, payload);
    const error = await validate(req);
    expect(error).toBeDefined();
  });

  it('should throw error \
     when password length less than 8 chars', async () => {
    payload.password = 'Abcde';
    const req = plainToClass(AddUserDTO, payload);
    const error = await validate(req);
    expect(error).toBeDefined();
  });

  it('should throw error \
     when firstName has length greater than 20 chars', async () => {
    payload.firstName = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    const req = plainToClass(AddUserDTO, payload);
    const error = await validate(req);
    expect(error).toBeDefined();
  });

  it('should throw error \
     when lastname has length greater than 20 chars', async () => {
    payload.lastName = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    const req = plainToClass(AddUserDTO, payload);
    const error = await validate(req);
    expect(error).toBeDefined();
  });
});
