import { Application } from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import UserController from './controllers/user.controller';

export class UserRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'UserRoutes');
  }

  configureRoutes() {
    this.router.post('/register', UserController.registerUser);
    this.router.post('/login', UserController.loginUser);
    this.router.post('/logout', UserController.logoutUser);

    return this.router;
  }
}
