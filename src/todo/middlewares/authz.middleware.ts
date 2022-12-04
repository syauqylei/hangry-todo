import { isMongoId } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { ResponseDTO } from '../../common/dtos/response.dto';
import TodoModel from '../models/todo.model';

export const authz = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errorJson: ResponseDTO<null> = {
    message: 'Forbidden',
    error: 'Forbidden',
    data: null,
    statusCode: 403,
  };
  const todoId = req.params.todoId;
  const user = req.session.user;
  if (!isMongoId(todoId)) {
    errorJson.statusCode = 400;
    errorJson.error = 'Bad Request';
    errorJson.message = `Request params todoId is not valid mongoId`;
    res.status(errorJson.statusCode).json(errorJson);
  } else {
    let todo;
    try {
      todo = await TodoModel.findById(todoId);
      if (!todo) {
        errorJson.message = `Request params todoId is not exist`;
        errorJson.statusCode = 400;
        errorJson.error = 'Bad Request';
        res.status(errorJson.statusCode).json(errorJson);
      } else {
        if (!user) {
        errorJson.statusCode = 400;
        errorJson.error = 'Bad Request';
        errorJson.message = `Request session is not exist`;
        res.status(errorJson.statusCode).json(errorJson);
        } else if(todo.createdBy !== user._id) {
        errorJson.statusCode = 403;
        errorJson.error = 'Forbidden';
        errorJson.message = `Unauthorized to edit this todo`;
        res.status(errorJson.statusCode).json(errorJson);
        } else {
          next();
        }
      }
    } catch (err) {
      errorJson.message = 'Failed DB operation';
      errorJson.statusCode = 500;
      errorJson.error = 'Internal Server Error';
      res.status(errorJson.statusCode).json(errorJson);
    }
  }
};
