import todoController from './todo.controller';
import todoService from '../services/todo.service';
import { AddTodoResStub } from '../stubs/add.todo.res.stub';

jest.mock('../services/todo.service');

const mockService = todoService as jest.Mocked<typeof todoService>;
describe('Testing TodoController', () => {
  let mockReq: any;
  let mockRes: any;
  let mockNext: any;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  describe('Testing addTodo', () => {
    it('should call next when error occurs in service', async () => {
      mockService.addTodo.mockImplementation(() => {
        throw new Error();
      });

      await todoController.addTodo(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalledWith(new Error());
    });

    it('should call res when service method is success', async () => {
      mockService.addTodo.mockResolvedValue(AddTodoResStub());

      await todoController.addTodo(mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(AddTodoResStub());
    });
  });
});
