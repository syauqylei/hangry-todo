import { AddUserDTO } from '../dtos/add.user.dto';
import { userStub } from '../stubs/user.stub';
import UserService from './user.services';
import { BadRequest, InternalServerError } from '@curveball/http-errors/dist';
import UserModel from '../models/user.model';

describe('Testing UserService', () => {
  let user: AddUserDTO;

  it('should be able to call new UserService', () => {
    const userService = new UserService();
    expect(userService).toBeTruthy();
    expect(userService).toHaveProperty('addUser');
  });

  describe('Testing addUser', () => {
    let userService: UserService;
    beforeEach(() => {
      user = userStub();
      userService = new UserService();
    });

    it('should throw error when email is already exist', async () => {
      jest.spyOn(UserModel, 'findOne').mockResolvedValue(user);
      let err;
      try {
        await userService.addUser(user);
      } catch (e) {
        err = e;
        expect(err).toBeInstanceOf(BadRequest);
      }
      expect(err).toBeDefined();
    });

    it('should return email when user succesfully added', async () => {
      jest.spyOn(UserModel, 'findOne').mockResolvedValue(undefined);
      jest.spyOn(UserModel, 'create').mockReturnValue();
      const ret = await userService.addUser(user);
      expect(ret).toEqual(user.email);
    });

    it('should throw InternalServerError', async () => {
      jest.spyOn(UserModel, 'findOne').mockResolvedValue(undefined);
      jest.spyOn(UserModel, 'create')
        .mockImplementation(() => {
          throw new Error();
        });
      let err;
      try {
        await userService.addUser(user);
      } catch(error) {
        err = error
      }
      expect(err).toBeInstanceOf(InternalServerError);
      
    })
  });
});
