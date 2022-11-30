import { AddUserDTO } from '../dtos/add.user.dto';
import { userStub } from '../stubs/user.stub';
import { encryptPass } from './user.utils';

let user: AddUserDTO;
beforeEach(() => {
  user = userStub();
});
describe('Testing user utils', () => {
  it('should return hashed string', () => {
    const hashed = encryptPass(user.password);
    expect(hashed).not.toEqual(user.password);
  });
});
