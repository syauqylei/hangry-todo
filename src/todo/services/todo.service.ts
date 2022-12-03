import { InternalServerError } from '@curveball/http-errors/dist';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ResponseDTO } from '../../common/dtos/response.dto';
import { ValidationReqError } from '../../common/errors';
import { AddTodoDTO } from '../dtos/add.todo.dto';
import TodoModel from '../models/todo.model';

class TodoService {
  async addTodo(reqBody: any): Promise<ResponseDTO<null>> {
    const todoData = plainToClass(AddTodoDTO, reqBody);
    const errs = await validate(todoData);

    if (errs.length > 0) {
      throw new ValidationReqError('Request body is not valid', errs);
    }

    try {
      await TodoModel.create(todoData);
    } catch (err) {
      throw new InternalServerError('Failed DB operation');
    }

    const ret: ResponseDTO<null> = {
      statusCode: 201,
      message: 'A Todo is successfully created',
      data: null,
      error: null,
    };
    return ret;
  }
}

export default new TodoService();
