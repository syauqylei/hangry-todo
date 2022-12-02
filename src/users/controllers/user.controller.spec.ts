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
const mockService = UserService as jest.MockedClass<typeof UserService>;

describe('Testing UserController', () => {
  let mockRes: any;
  let mockReq: any;
  let mockNext: any;
  let controller: UserController;
  let userData: AddUserDTO;

  beforeEach(() => {
    userData = userStub();

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockReq = {};
    mockNext = jest.fn();
    mockService.mockClear();
  });

  describe('Testing register', () => {
    it('should call next when userServce throw an error', async () => {
      controller = new UserController();
      expect(UserService).toHaveBeenCalled();

      mockReq.body = plainToClass(AddUserDTO, userData);
      const mockInstaceService = mockService.mock.instances[0];
      (mockInstaceService.addUser as jest.Mock).mockImplementation(() => {
        throw new Error();
      });

      await controller.register(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should call res to send response when addUser is success', async () => {
      controller = new UserController();
      expect(UserService).toHaveBeenCalled();

      mockReq.body = plainToClass(AddUserDTO, userData);
      const mockInstaceService = mockService.mock.instances[0];
      (mockInstaceService.addUser as jest.Mock).mockResolvedValue(
        SignUpResStub(),
      );

      await controller.register(mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(SignUpResStub());
    });
  });

  describe('Testing login', () => {
    it('should call next when userServce throw an error', async () => {
      controller = new UserController();
      expect(UserService).toHaveBeenCalled();

      mockReq.body = plainToClass(LoginUserDTO, userData);
      const mockInstaceService = mockService.mock.instances[0];
      (mockInstaceService.loginUser as jest.Mock).mockImplementation(() => {
        throw new Error();
      });

      await controller.loginUser(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should call res to send response when addUser is success', async () => {
      controller = new UserController();
      expect(UserService).toHaveBeenCalled();

      mockReq.body = plainToClass(AddUserDTO, userData);
      const mockInstaceService = mockService.mock.instances[0];
      (mockInstaceService.loginUser as jest.Mock).mockResolvedValue(
        LoginResStub(),
      );

      await controller.loginUser(mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(LoginResStub());
    });
  });

  describe('Testing logout', () => {
    it('should call next when userServce throw an error', async () => {
      controller = new UserController();
      expect(UserService).toHaveBeenCalled();

      mockReq.body = plainToClass(LogoutUserDTO, LogoutUserStub());
      const mockInstaceService = mockService.mock.instances[0];
      (mockInstaceService.logoutUser as jest.Mock).mockImplementation(() => {
        throw new Error();
      });

      await controller.logoutUser(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should call res to send response when logoutUSer is success', async () => {
      controller = new UserController();
      expect(UserService).toHaveBeenCalled();

      mockReq.body = plainToClass(LogoutUserDTO, LogoutUserStub());
      const mockInstaceService = mockService.mock.instances[0];
      (mockInstaceService.logoutUser as jest.Mock).mockResolvedValue(
        LogoutUserResStub(),
      );

      await controller.logoutUser(mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(LogoutUserResStub());
    });
  });
});
