import { mongo } from 'mongoose';
import { AuthFailedResStub } from '../../common/stubs/auth.res.stub';
import { JWTTokenStub } from '../../users/stubs/token.stub';
import { authz } from './authz.middleware';
import * as jwt from 'jsonwebtoken';
import TodoModel from '../models/todo.model';
import { TodoStubs } from '../stubs/todo.stub';

describe('Testing Authz', () => {
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
      session: {
        userId: null,
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
    resStub = AuthFailedResStub();
  });

  it('should send 400 when todo_id is mongoId', async () => {
    resStub.statusCode = 400;
    resStub.error = 'Bad Request';
    resStub.message = 'Request params todoId is not valid mongoId';

    mockReq.params.todoId = 'asds';

    await authz(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(resStub);
  });

  it('should send 500 when Db operation failed', async () => {
    resStub.message = 'Failed DB operation';
    resStub.error = 'Internal Server Error';
    resStub.statusCode = 500;
    jest.spyOn(TodoModel, 'findById').mockImplementation(() => {
      throw new Error();
    });

    await authz(mockReq, mockRes, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith(resStub);
  });

  it('should send 403 when todoId is not createdBy user_id', async () => {
    const todo = TodoStubs()[0];
    mockReq.session.user = { _id: todo.assignee };
    jest.spyOn(TodoModel, 'findById').mockResolvedValue(todo);
    resStub.statusCode = 403;
    resStub.message = 'Unauthorized to edit this todo';
    resStub.error = 'Forbidden';

    await authz(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.json).toHaveBeenCalledWith(resStub);
  });

  it('should call next when todoId is createdBy user_id', async () => {
    const todo = TodoStubs()[0];
    mockReq.session.user = { _id: todo.createdBy };
    jest.spyOn(TodoModel, 'findById').mockResolvedValue(todo);

    await authz(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });

  it('should send 400 when todoId is not found', async () => {
    const todo = TodoStubs()[0];
    mockReq.session.user = { _id: todo.createdBy };
    jest.spyOn(TodoModel, 'findById').mockResolvedValue(null);
    resStub.statusCode = 400;
    resStub.error = 'Bad Request';
    resStub.message = `Request params todoId is not exist`;

    await authz(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(resStub);
  });

  it('should send 400 when user is not found', async () => {
    const todo = TodoStubs()[0];
    mockReq.session = {}
    jest.spyOn(TodoModel, 'findById').mockResolvedValue(todo);
    resStub.statusCode = 400;
    resStub.error = 'Bad Request';
    resStub.message = `Request session is not exist`;

    await authz(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(resStub);
  });
});
