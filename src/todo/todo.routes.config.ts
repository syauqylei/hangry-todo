import { Application } from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import todoController from "./controllers/todo.controller";

export class TodoRoutesConfig extends CommonRoutesConfig {
  private readonly baseURL: string;

  constructor(app: Application) {
    super(app, 'UserRoutes');
    this.baseURL = '/todo';
  }

  configureRoutes() {
    this.router.post(`${this.baseURL}/todo`, todoController.addTodo)
    this.router.get(`${this.baseURL}/todo`, todoController.listTodos)
    this.router.delete(`${this.baseURL}/todo/:todoId`, todoController.deleteTodo)
    this.router.patch(`${this.baseURL}/todo/:todoId/:status`, todoController.patchStatusTodo)

    return this.router;
  }
}
