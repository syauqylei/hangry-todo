import { plainToClass } from 'class-transformer';
import { AddUserDTO } from '../dtos/add.user.dto';
import { LoginResStub } from '../stubs/user.login.res.stub';
import UserService from '../services/user.services';
import { userStub } from '../stubs/user.stub';
import UserController from './user.controller';
import { SignUpResStub } from '../stubs/user.siginup.res.stub';
import { LoginUserDTO } from '../dtos/login.user.dto';
import { LogoutUserDTO } from '../dtos/logout.user.dto';
import { LogoutUserStub } from '../stubs/user.logout.stub';
import { LogoutUserResStub } from '../stubs/user.logout.res.stub';

jest.mock('../services/user.services');
const mockService = UserService as jest.Mocked<typeof UserService>;

describe('Testing UserController', () => {
  let mockRes: any;
  let mockReq: any;
  let mockNext: any;
  let userData: AddUserDTO;

  beforeEach(() => {
    userData = userStub();

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockReq = {};
    mockNext = jest.fn();
  });

  describe('Testing register', () => {
    beforeEach(() => {
      mockService.addUser.mockReset();
    });

    it('should call next when userServce throw an error', async () => {
      mockReq.body = plainToClass(AddUserDTO, userData);
      mockService.addUser.mockImplementation(() => {
        throw new Error();
      });

      await UserController.registerUser(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should call res to send response when addUser is success', async () => {
      mockReq.body = plainToClass(AddUserDTO, userData);
      mockService.addUser.mockResolvedValue(SignUpResStub());

      await UserController.registerUser(mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(SignUpResStub());
    });
  });

  describe('Testing login', () => {
    beforeEach(() => {
      mockService.loginUser.mockReset();
    });

    it('should call next when userServce throw an error', async () => {
      mockReq.body = plainToClass(LoginUserDTO, userData);
      mockService.loginUser.mockImplementation(() => {
        throw new Error();
      });

      await UserController.loginUser(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should call res to send response when addUser is success', async () => {
      mockReq.body = plainToClass(AddUserDTO, userData);
      mockService.loginUser.mockResolvedValue(LoginResStub());

      await UserController.loginUser(mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(LoginResStub());
    });
  });

  describe('Testing logout', () => {
    beforeEach(() => {
      mockService.logoutUser.mockReset();
    });

    it('should call next when userServce throw an error', async () => {
      mockReq.body = plainToClass(LogoutUserDTO, LogoutUserStub());
      mockService.logoutUser.mockImplementation(() => {
        throw new Error();
      });

      await UserController.logoutUser(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should call res to send response when logoutUSer is success', async () => {
      mockReq.body = plainToClass(LogoutUserDTO, LogoutUserStub());
      mockService.logoutUser.mockResolvedValue(LogoutUserResStub());

      await UserController.logoutUser(mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(LogoutUserResStub());
    });
  });
});
