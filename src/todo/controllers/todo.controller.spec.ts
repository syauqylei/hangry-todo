import todoController from './todo.controller';
import todoService from '../services/todo.service';
import { AddTodoResStub } from '../stubs/add.todo.res.stub';
import { TodoResStub } from '../stubs/list.todo.res.stub';
import { TodoStubs } from '../stubs/todo.stub';
import { DeleteResStub } from '../stubs/delete.todo.res.stub';
import { mongo } from 'mongoose';
import { PatchResStub } from '../stubs/patch.todo.res.stub';

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

  describe('Testing listTodos', () => {
    let todos: any;
    beforeEach(() => {
      todos = TodoResStub();
    })
    it('should call next when error occurs in service', async () => {
      mockService.listTodos.mockImplementation(() => {
        throw new Error();
      });

      await todoController.listTodos(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalledWith(new Error());
    });

    it('should call res when service method is success', async () => {
      mockReq = {
        query: {
          assignee:new mongo.ObjectId().toString()

        }       
      };
      mockService.listTodos.mockResolvedValue(todos);

      await todoController.listTodos(mockReq, mockRes, mockNext);
      expect(mockService.listTodos).toHaveBeenCalledWith(mockReq.query);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(todos);
    });
  });

  describe('Testing deleteTodo', () => {
    let res: any;
    beforeEach(() => {
      res = DeleteResStub();
    })

    it('should call next when error occurs in service', async () => {
      mockService.deleteTodo.mockImplementation(() => {
        throw new Error();
      });

      await todoController.deleteTodo(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalledWith(new Error());
    });

    it('should call res when service method is success', async () => {
      mockReq = {
        params: {
          todoId: new mongo.ObjectId().toString(),
        }
      }
      mockService.deleteTodo.mockResolvedValue(res);

      await todoController.deleteTodo(mockReq, mockRes, mockNext);
      expect(mockService.deleteTodo).toHaveBeenCalledWith(mockReq.params)
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(res);
    });
  });

  describe('Testing patchStatusTodo', () => {
    let res: any;
    beforeEach(() => {
      res = PatchResStub();
    })

    it('should call next when error occurs in service', async () => {
      mockService.patchStatusTodo.mockImplementation(() => {
        throw new Error();
      });

      await todoController.patchStatusTodo(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalledWith(new Error());
    });

    it('should call res when service method is success', async () => {
      mockReq = {
        params: {
          todoId: new mongo.ObjectId().toString(),
          status: 'done'
        }
      }
      mockService.patchStatusTodo.mockResolvedValue(res);

      await todoController.patchStatusTodo(mockReq, mockRes, mockNext);
      expect(mockService.patchStatusTodo).toHaveBeenCalledWith(mockReq.params)
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(res);
    });
  });
});
