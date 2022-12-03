import {
  closeTestDB,
  connectTestDB,
  dropTestDB,
} from '../../common/databaseTest';
import UserModel from '../../users/models/user.model';
import { userStub } from '../../users/stubs/user.stub';
import { AddTodoStubs } from '../stubs/add.todo.stubs';
import TodoModel from './todo.model';

beforeAll(async () => {
  await connectTestDB();
});

afterEach(async () => {
  await dropTestDB();
});

afterAll(async () => {
  await closeTestDB();
});

describe('Testing TodoModel', () => {
  let payload: any;

  beforeEach(() => {
    payload = AddTodoStubs();
  });

  it('should throw error when created by user that does not exist', async () => {
    let err: unknown;
    try {
      await TodoModel.create(payload);
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
  });

  it('should accept when user is a when created by user that does not exist', async () => {
    const user = userStub();
    const currUser = await UserModel.create(user);
    const objId = currUser._id.toString();

    payload.createdBy = objId;
    payload.assignee = objId;

    let err: unknown;
    try {
      await TodoModel.create(payload);
    } catch (error) {
      err = error;
    }
    expect(err).toBeUndefined();
  });
});
