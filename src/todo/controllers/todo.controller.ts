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
}

export default new TodoController();
