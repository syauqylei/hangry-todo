import { Application } from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import { auth } from "../common/middlewares/auth.middleware";
import todoController from "./controllers/todo.controller";
import { authz } from "./middlewares/authz.middleware";

export class TodoRoutesConfig extends CommonRoutesConfig {
  private readonly baseURL: string;

  constructor(app: Application) {
    super(app, 'UserRoutes');
    this.baseURL = '/todo';
  }

  configureRoutes() {
    this.router.post(
      `${this.baseURL}/todo`,
      auth,
      todoController.addTodo
    );
    this.router.get(
      `${this.baseURL}/todo`,
      auth,
      todoController.listTodos
    );
    this.router.delete(
      `${this.baseURL}/todo/:todoId`,
      auth,
      authz,
      todoController.deleteTodo
    );
    this.router.patch(
      `${this.baseURL}/todo/:todoId/:status`,
      auth,
      authz,
      todoController.patchStatusTodo
    );

    return this.router;
  }
}
