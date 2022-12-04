import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.services';
import debug from 'debug';

const log: debug.IDebugger = debug('app:users-controller');
class UserController {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const ret = await UserService.addUser(req.body);
      res.status(ret.statusCode).json(ret);
    } catch (err) {
      next(err);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const ret = await UserService.loginUser(req.body);
      res.status(ret.statusCode).json(ret);
    } catch (err) {
      next(err);
    }
  }

  async logoutUser(req: Request, res: Response, next: NextFunction) {
    try {
      const ret = await UserService.logoutUser(req.body);

      res.status(ret.statusCode).json(ret);
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
