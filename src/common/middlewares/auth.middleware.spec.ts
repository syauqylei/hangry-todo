import { AuthFailedResStub } from '../stubs/auth.res.stub';
import { auth } from './auth.middleware';
import * as jwt from 'jsonwebtoken';
import { JWTTokenStub } from '../../users/stubs/token.stub';
import { JWTPayload } from '../../users/interfaces/payload.jwt';
import { JWTPayloadStubs } from '../../users/stubs/jwt.payload.stub';
import UserModel from '../../users/models/user.model';
import { userStub } from '../../users/stubs/user.stub';
import { mongo } from 'mongoose';
jest.mock('jsonwebtoken');

describe('Testing auth middleware', () => {
  let mockReq: any;
  let mockRes: any;
  let mockNext: any;
  let resStub: any;
  const mockJWT = jwt as jest.Mocked<typeof jwt>;

  beforeEach(() => {
    mockReq = {
      headers: {
        authorization: `Bearer ${JWTTokenStub()}`,
      },
      params: {
        todoId: new mongo.ObjectId().toString(),
      },
      session: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
    resStub = AuthFailedResStub();
  });

  it('should send status 401 when there is no header token', async () => {
    delete mockReq.headers.authorization;

    await auth(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith(resStub);
  });

  it('should send status 411 when there is no Bearer keyword token', async () => {
    mockReq.headers.authorization = mockReq.headers.authorization.replace(
      'Bearer ',
      '',
    );
    resStub.message = 'Authorization header Bearer keyword is not provided';

    await auth(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith(resStub);
  });

  it('should send status 401 when token verification failed', async () => {
    const mockJWT = jwt as jest.Mocked<typeof jwt>;
    mockJWT.verify.mockImplementation(() => {
      throw new Error();
    });
    resStub.message = 'Token verification failed';

    await auth(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith(resStub);
  });

  it('should send status 401 when DB operation failed', async () => {
    const jwtPayload = JWTPayloadStubs() as JWTPayload;
    mockJWT.verify.mockImplementation(() => jwtPayload);
    resStub.message = 'Token verification failed';
    jest.spyOn(UserModel, 'findOne').mockImplementation(() => {
      throw new Error();
    });
    await auth(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith(resStub);
  });

  it('should send status 401 when user is not found', async () => {
    const jwtPayload = JWTPayloadStubs() as JWTPayload;
    mockJWT.verify.mockImplementation(() => jwtPayload);
    resStub.message = 'Token verification failed';
    jest.spyOn(UserModel, 'findOne').mockResolvedValue(null);

    await auth(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith(resStub);
  });

  it('should call next', async () => {
    const jwtPayload = JWTPayloadStubs() as JWTPayload;
    const user = {
      _id: jwtPayload._id,
    };
    mockJWT.verify.mockImplementation(() => jwtPayload);
    jest.spyOn(UserModel, 'findOne').mockResolvedValue(user);

    await auth(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockReq.session.user._id).toEqual(jwtPayload._id);
  });
});
