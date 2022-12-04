import { TodoStubs } from './todo.stub';

export const TodoResStub = () => {
  return {
    statusCode: 200,
    message: 'Todo is successfully retrieved',
    data: TodoStubs(),
    error: null,
  };
};
