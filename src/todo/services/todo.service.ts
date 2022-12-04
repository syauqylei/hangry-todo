import { BadRequest, InternalServerError, NotFound } from '@curveball/http-errors/dist';
import { plainToClass } from 'class-transformer';
import { isMongoId, validate } from 'class-validator';
import { Query } from 'mongoose';
import { ResponseDTO } from '../../common/dtos/response.dto';
import { ValidationReqError } from '../../common/errors';
import { AddTodoDTO } from '../dtos/add.todo.dto';
import { FilterTodoDTO } from '../dtos/filter.todo.dto';
import { PatchParamsDTO } from '../dtos/patch.params.todo.dto';
import { StatusTodo } from '../dtos/status.enum';
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

  async listTodos(reqQuery:any): Promise<ResponseDTO<any>> {
    const req = plainToClass(FilterTodoDTO, reqQuery);
    const errs = await validate(req);
    if (errs.length > 0) {
      throw new ValidationReqError(
        'Query Param is not valid',
        errs
      );
    }

    let query = {}
    if (req.assignee) {
      query = {
        assignee: req.assignee
      }
    }
    let data;
    try {
      data = await TodoModel.find(query)
    } catch(err) {
      throw new InternalServerError("Failed DB operation");
    }
    const ret: ResponseDTO<any> = {
      statusCode: 200,
      message: 'Todo is successfully retrieved',
      data: data,
      error: null
    }
    return ret;
  }

  async deleteTodo(reqParams:any): Promise<ResponseDTO<null>> {
    if(!reqParams.todoId) {
      throw new BadRequest('Request does not provide todoId');
    }
    const todoId = reqParams.todoId;
    if (!isMongoId(todoId)) {
      throw new BadRequest('Request does not correct todoId')
    }
    let todo;
    try {
      todo = await TodoModel.findByIdAndRemove(todoId)
    } catch (err) {
      throw new InternalServerError('Failed DB operation')
    }

    if (!todo) {
      throw new NotFound(`Todo ${todoId} is not found`)
    }

    const ret: ResponseDTO<null> = {
      message: `Todo ${todoId} is successfully deleted`,
      data: null,
      error: null,
      statusCode: 200
    }
    return ret;
  }

  async patchStatusTodo(reqParams: any): Promise<ResponseDTO<null>> {
    const req = plainToClass(PatchParamsDTO,reqParams);
    const errs = await validate(req)
    if (errs.length > 0) {
      throw new ValidationReqError('Request params is not valid format',errs)
    }

    const todoId = req.todoId
    const status = req.status as StatusTodo;

    let todo;
    try {
      todo = await TodoModel.findByIdAndUpdate(todoId, {
        status: status
      });
    } catch(error) {
      throw new InternalServerError('Failed DB operation');
    }

    if (!todo) {
      throw new NotFound(`Todo ${todoId} is not found`)
    } 

    const ret: ResponseDTO<null> = {
      message: `Todo ${todoId} is successfully updated`,
      statusCode: 200,
      error: null,
      data: null
    }
    return ret;
  }
}

export default new TodoService();
