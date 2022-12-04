import { Application } from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import { auth } from '../common/middlewares/auth.middleware';
import todoController from './controllers/todo.controller';
import { authz } from './middlewares/authz.middleware';

export class TodoRoutesConfig extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'TodoRoutes');
  }

  configureRoutes() {
    this.router.post('/todo', auth, todoController.addTodo);
    this.router.get('/todo', auth, todoController.listTodos);
    this.router.delete('/todo/:todoId', auth, authz, todoController.deleteTodo);
    this.router.patch(
      '/todo/:todoId/:status',
      auth,
      authz,
      todoController.patchStatusTodo,
    );

    return this.router;
  }
}
