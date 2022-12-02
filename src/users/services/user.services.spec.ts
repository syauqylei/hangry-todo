import { BadRequest, InternalServerError } from '@curveball/http-errors/dist';
import { AddUserDTO } from '../dtos/add.user.dto';
import { userStub } from '../stubs/user.stub';
import UserService from './user.services';
import UserModel from '../models/user.model';
import { LoginUserDTO } from '../dtos/login.user.dto';
import { LoginUserStub } from '../stubs/user.login.stub';
import * as bcrypt from 'bcrypt';
import { LoginResStub } from '../stubs/user.login.res.stub';
import mongoose from 'mongoose';
import { genJWTToken } from '../utils/user.utils';
import { SignUpResStub } from '../stubs/user.siginup.res.stub';
import { JWTTokenStub } from '../stubs/token.stub';
import * as jwt from 'jsonwebtoken';
import { JWTPayloadStubs } from '../stubs/jwt.payload.stub';
import { LogoutUserResStub } from '../stubs/user.logout.res.stub';
import { LogoutUserStub } from '../stubs/user.logout.stub';
import { ValidationReqError } from '../../common/errors';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../utils/user.utils');

describe('Testing UserService', () => {
  let userService: UserService;

  beforeAll(() => {
    userService = new UserService();
  });

  it('should be able to call new UserService', () => {
    const userService = new UserService();
    expect(userService).toBeTruthy();
    expect(userService).toHaveProperty('addUser');
    expect(userService).toHaveProperty('loginUser');
  });

  describe('Testing addUser', () => {
    let user: AddUserDTO;

    beforeEach(() => {
      user = userStub();
    });

    it('should throw validationError when request body is not valid format', async () => {
      user.email = 'john.doe';
      user.password = 'aa11';

      let err;
      try {
        await userService.addUser(user);
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(ValidationReqError);
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

    it('should return Response data', async () => {
      jest.spyOn(UserModel, 'findOne').mockResolvedValue(undefined);
      jest.spyOn(UserModel, 'create').mockReturnValue();
      const ret = await userService.addUser(user);
      expect(ret).toEqual(SignUpResStub());
    });

    it('should throw InternalServerError when db operation is failed', async () => {
      jest.spyOn(UserModel, 'findOne').mockResolvedValue(undefined);
      jest.spyOn(UserModel, 'create').mockImplementation(() => {
        throw new Error();
      });
      let err;
      try {
        await userService.addUser(user);
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(InternalServerError);
    });
  });

  describe('Testing loginUser', () => {
    let loginData: LoginUserDTO;
    let userData: AddUserDTO;
    const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;
    const mockedGenJWTToken = genJWTToken as jest.MockedFunction<
      typeof genJWTToken
    >;

    beforeEach(() => {
      userData = userStub();
      loginData = LoginUserStub();
    });

    it('should throw validationError when request body is not valid format', async () => {
      loginData.email = 'john.doe';
      loginData.password = 'aa11';

      let err;
      try {
        await userService.loginUser(loginData);
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(ValidationReqError);
    });

    it('should throw BadRequest when email does not exist', async () => {
      jest.spyOn(UserModel, 'findOne').mockResolvedValue(undefined);
      let err;
      try {
        const ret = await userService.loginUser(loginData);
        expect(ret).toBeFalsy();
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(BadRequest);
    });

    it('should throw BadRequest when password is not correct', async () => {
      jest.spyOn(UserModel, 'findOne').mockResolvedValue(userData);
      mockedBcrypt.compareSync.mockReturnValue(false);

      let err;
      try {
        const ret = await userService.loginUser(loginData);
        expect(ret).toBeFalsy();
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(BadRequest);
    });

    it('should return Response data', async () => {
      const userFromDB = { ...userData, _id: new mongoose.Types.ObjectId() };
      jest.spyOn(UserModel, 'findOne').mockResolvedValue(userFromDB);

      mockedBcrypt.compareSync.mockReturnValue(true);

      mockedGenJWTToken.mockReturnValue(JWTTokenStub());

      const ret = await userService.loginUser(loginData);
      expect(ret).toStrictEqual(LoginResStub());
    });
  });

  describe('Testing logoutUser', () => {
    const mockJWT = jwt as jest.Mocked<typeof jwt>;

    it('should throw validationError when request body is not valid format', async () => {
      const logoutData = LogoutUserStub();
      logoutData.token = 'asd';

      let err;
      try {
        await userService.logoutUser(logoutData);
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(ValidationReqError);
    });

    it('should throw BadRequest when token expired', async () => {
      mockJWT.verify.mockImplementation(() => {
        throw new Error();
      });
      let err;
      try {
        await userService.logoutUser(LogoutUserStub());
      } catch (error) {
        err = error;
      }
      expect(err).toBeDefined();
    });

    it('should throw InternalServerError when DB operation failed', async () => {
      mockJWT.verify.mockImplementation(() => JWTPayloadStubs());
      jest.spyOn(UserModel, 'findOneAndUpdate').mockImplementation(() => {
        throw new Error();
      });
      let err;
      try {
        await userService.logoutUser(LogoutUserStub());
      } catch (error) {
        err = error;
      }
      expect(err).toBeDefined();
    });

    it('should return Response data', async () => {
      mockJWT.verify.mockImplementation(() => JWTPayloadStubs());
      jest.spyOn(UserModel, 'findOneAndUpdate').mockResolvedValue(null);
      const ret = await userService.logoutUser(LogoutUserStub());
      expect(ret).toStrictEqual(LogoutUserResStub());
    });
  });
});
