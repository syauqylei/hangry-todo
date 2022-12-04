import { NextFunction, Request, Response } from 'express';
import todoService from '../services/todo.service';

class TodoController {
  async addTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const ret = await todoService.addTodo(req.body);
      res.status(ret.statusCode).json(ret);
    } catch (err) {
      next(err);
    }
  }
  async listTodos(req: Request, res: Response, next: NextFunction) {
    try {
      const ret = await todoService.listTodos(req.query);
      res.status(ret.statusCode).json(ret);
    } catch (err) {
      next(err);
    }
  }

  async deleteTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const ret = await todoService.deleteTodo(req.params);
      res.status(ret.statusCode).json(ret);
    } catch (err) {
      next(err);
    }
  }

  async patchStatusTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const ret = await todoService.patchStatusTodo(req.params);
      res.status(ret.statusCode).json(ret);
    } catch (err) {
      next(err);
    }
  }
}

export default new TodoController();
