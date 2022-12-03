import { InternalServerError } from '@curveball/http-errors/dist';
import { ValidationReqError } from '../../common/errors';
import TodoModel from '../models/todo.model';
import { AddTodoResStub } from '../stubs/add.todo.res.stub';
import { AddTodoStubs } from '../stubs/add.todo.stubs';
import TodoService from './todo.service';

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
        await TodoService.addTodo(payload);
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
        await TodoService.addTodo(payload);
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(InternalServerError);
    });

    it('should return Response data', async () => {
      jest.spyOn(TodoModel, 'create').mockReturnValue(undefined);
      const ret = await TodoService.addTodo(payload);
      expect(ret).toEqual(AddTodoResStub());
    });
  });
});
