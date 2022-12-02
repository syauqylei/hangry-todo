import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.services';

export default class UserController {
  private readonly userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const ret = await this.userService.addUser(req.body);
      res.status(ret.statusCode).json(ret);
    } catch (err) {
      next(err);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const ret = await this.userService.loginUser(req.body);
      res.status(ret.statusCode).json(ret);
    } catch (err) {
      next(err);
    }
  }

  async logoutUser(req: Request, res: Response, next: NextFunction) {
    try {
      const ret = await this.userService.logoutUser(req.body);

      res.status(ret.statusCode).json(ret);
    } catch (err) {
      next(err);
    }
  }
}
