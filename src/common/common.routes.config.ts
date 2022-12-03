import express from 'express';
import { BASE_URL } from './constants';
import { errorHandler } from './error.middleware';

export abstract class CommonRoutesConfig {
  app: express.Application;
  router: express.Router;
  name: string;

  constructor(app: express.Application, name: string) {
    this.app = app;
    this.router = express.Router();
    this.name = name;
    this.app.use(BASE_URL, this.configureRoutes(), errorHandler);
  }
  getName() {
    return this.name;
  }
  abstract configureRoutes(): express.Router;
}
