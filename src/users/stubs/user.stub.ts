import { AddUserDTO } from '../dtos/add.user.dto';

export const userStub = (): AddUserDTO => {
  return {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@mail.com',
    password: 'Abcde_12345',
  };
};
