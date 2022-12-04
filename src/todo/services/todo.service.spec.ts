import {
  BadRequest,
  InternalServerError,
  NotFound,
} from '@curveball/http-errors/dist';
import { mongo } from 'mongoose';
import { ValidationReqError } from '../../common/errors';
import TodoModel, { ITodo } from '../models/todo.model';
import { AddTodoResStub } from '../stubs/add.todo.res.stub';
import { AddTodoStubs } from '../stubs/add.todo.stubs';
import { FilterTodoStubs } from '../stubs/filter.todo.stub';
import { TodoStubs } from '../stubs/todo.stub';
import todoService from './todo.service';

jest.mock('../models/todo.model');

const mockModel = TodoModel as jest.Mocked<typeof TodoModel>;

describe('Testing TodoSerivce', () => {
  describe('Testing addTodo', () => {
    let payload: any;

    beforeEach(() => {
      payload = AddTodoStubs();
    });

    it('should throw error when reqbody is not valid', async () => {
      payload.dueDate = 'Ocktoner 12';
      let err;
      try {
        await todoService.addTodo(payload);
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(ValidationReqError);
    });

    it(`should throw error when operation DB failed`, async () => {
      jest.spyOn(TodoModel, 'create').mockImplementation(() => {
        throw new InternalServerError('Failed DB Operation');
      });

      let err;
      try {
        await todoService.addTodo(payload);
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(InternalServerError);
    });

    it('should return Response data', async () => {
      jest.spyOn(TodoModel, 'create').mockReturnValue(undefined);
      const ret = await todoService.addTodo(payload);
      expect(ret).toEqual(AddTodoResStub());
    });
  });

  describe('Testing listTodos', () => {
    let payload: any;
    let todoStubs: any;
    beforeEach(() => {
      payload = FilterTodoStubs();
      todoStubs = TodoStubs();
    });

    it('should throw error when DB operation failed', async () => {
      jest.spyOn(TodoModel, 'find').mockImplementation(() => {
        throw new Error();
      });
      let err;
      try {
        await todoService.listTodos(payload);
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(InternalServerError);
    });

    it('should throw error when assingee id is not mongo id', async () => {
      payload.assignee = 'asdas';
      let err;
      try {
        await todoService.listTodos(payload);
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(ValidationReqError);
    });

    it('should call TodoModel.find with filter assignee', async () => {
      const todo = todoStubs[0];
      payload.assignee = todo.assignee;
      jest.spyOn(TodoModel, 'find').mockResolvedValue([todo]);

      await todoService.listTodos(payload);

      expect(TodoModel.find).toHaveBeenCalledWith({
        assignee: payload.assignee,
      });
    });

    it('should return ResponseData', async () => {
      jest.spyOn(TodoModel, 'find').mockResolvedValue(todoStubs);
      payload = {};

      const ret = await todoService.listTodos(payload);

      expect(TodoModel.find).toHaveBeenCalledWith({});
      expect(ret.statusCode).toEqual(200);
      expect(ret.message).toEqual('Todo is successfully retrieved');
      expect(ret.data).toStrictEqual(expect.arrayContaining(todoStubs));
    });
  });

  describe('Testing deleteTodo', () => {
    let todoStubs: any;
    let reqParms: any;
    beforeEach(() => {
      todoStubs = TodoStubs();
      reqParms = {};
    });

    it('should throw error when req.params does not provide todoId', async () => {
      let err;
      let ret;
      try {
        ret = await todoService.deleteTodo(reqParms);
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(BadRequest);
      expect(ret).toBeUndefined();
    });

    it('should throw error when todoId is not MongoId format', async () => {
      reqParms = {
        todoId: '123jkhasdhasjk',
      };
      let err;
      let ret;
      try {
        ret = await todoService.deleteTodo(reqParms);
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(BadRequest);
      expect(ret).toBeUndefined();
    });

    it('should throw error when todo is not found', async () => {
      reqParms = {
        todoId: new mongo.ObjectId().toString(),
      };
      jest.spyOn(TodoModel, 'findByIdAndRemove').mockResolvedValue(null);

      let err;
      let ret;
      try {
        ret = await todoService.deleteTodo(reqParms);
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(NotFound);
      expect(ret).toBeUndefined();
    });

    it('should throw error when findByIdAndRemove failed', async () => {
      reqParms = {
        todoId: new mongo.ObjectId().toString(),
      };
      jest.spyOn(TodoModel, 'findByIdAndRemove').mockImplementation(() => {
        throw new InternalServerError();
      });

      let err;
      let ret;
      try {
        ret = await todoService.deleteTodo(reqParms);
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(InternalServerError);
      expect(ret).toBeUndefined();
    });

    it('should return Response data', async () => {
      reqParms = {
        todoId: todoStubs[0]._id,
      };
      jest
        .spyOn(TodoModel, 'findByIdAndRemove')
        .mockResolvedValue(todoStubs[0]);

      const ret = await todoService.deleteTodo(reqParms);
      expect(ret.statusCode).toEqual(200);
      expect(ret.message).toEqual(
        `Todo ${reqParms.todoId} is successfully deleted`,
      );
    });
  });

  describe('Testing patchStatusTodo', () => {
    let todoStubs: any;
    let reqParms: any;
    beforeEach(() => {
      todoStubs = TodoStubs();
      reqParms = {};
    });

    it('should throw error when reqParams is not valid', async () => {
      let err;
      let ret;
      try {
        ret = await todoService.patchStatusTodo(reqParms);
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(ValidationReqError);
      expect(ret).toBeUndefined();
    });

    it('should throw error todoId in not exist in req.params', async () => {
      let err;
      let ret;
      try {
        ret = await todoService.patchStatusTodo(reqParms);
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(BadRequest);
      expect(ret).toBeUndefined();
    });

    it('should throw error when todoId is not mongoId', async () => {
      reqParms = {
        todoId: '123801278389sd',
      };
      let err;
      let ret;
      try {
        ret = await todoService.patchStatusTodo(reqParms);
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(BadRequest);
      expect(ret).toBeUndefined();
    });

    it('should throw error when db operation failed', async () => {
      reqParms = {
        todoId: new mongo.ObjectId().toString(),
        status: 'inprogress',
      };
      jest.spyOn(TodoModel, 'findByIdAndUpdate').mockImplementation(() => {
        throw new Error();
      });
      let err;
      let ret;
      try {
        ret = await todoService.patchStatusTodo(reqParms);
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(InternalServerError);
      expect(ret).toBeUndefined();
    });

    it('should throw error when reqParams does not provide status', async () => {
      reqParms = {
        todoId: new mongo.ObjectId().toString(),
      };
      let err;
      let ret;
      try {
        ret = await todoService.patchStatusTodo(reqParms);
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(BadRequest);
      expect(ret).toBeUndefined();
    });

    it('should throw error when status is not todo, inprogress, done', async () => {
      reqParms = {
        todoId: new mongo.ObjectId().toString(),
        status: 'asd',
      };
      let err;
      let ret;
      try {
        ret = await todoService.patchStatusTodo(reqParms);
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(BadRequest);
      expect(ret).toBeUndefined();
    });

    it('should throw error when todo is not found', async () => {
      reqParms = {
        todoId: new mongo.ObjectId().toString(),
        status: 'done',
      };
      jest.spyOn(TodoModel, 'findByIdAndUpdate').mockResolvedValue(null);

      let err;
      let ret;
      try {
        ret = await todoService.patchStatusTodo(reqParms);
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(NotFound);
      expect(ret).toBeUndefined();
    });

    it('should call findByIdAndUpdate with _id and updated status', async () => {
      reqParms = {
        todoId: todoStubs[0]._id,
        status: 'done',
      };
      jest
        .spyOn(TodoModel, 'findByIdAndUpdate')
        .mockResolvedValue(todoStubs[0]);

      const ret = await todoService.patchStatusTodo(reqParms);
      expect(TodoModel.findByIdAndUpdate).toHaveBeenCalledWith(
        reqParms.todoId,
        {
          status: reqParms.status,
        },
      );
    });

    it('should return Response data when db update success', async () => {
      reqParms = {
        todoId: todoStubs[0]._id,
        status: 'done',
      };
      jest
        .spyOn(TodoModel, 'findByIdAndUpdate')
        .mockResolvedValue(todoStubs[0]);

      const ret = await todoService.patchStatusTodo(reqParms);
      expect(ret.statusCode).toEqual(200);
      expect(ret.message).toEqual(
        `Todo ${reqParms.todoId} is successfully updated`,
      );
    });
  });
});
