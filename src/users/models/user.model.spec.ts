import {
  closeTestDB,
  connectTestDB,
  dropTestDB,
} from '../../common/databaseTest';
import { AddUserDTO } from '../dtos/add.user.dto';
import { userStub } from '../stubs/user.stub';
import UserModel from './user.model';

let user: AddUserDTO;

beforeAll(async () => {
  await connectTestDB();
});
beforeEach(() => {
  user = userStub();
});

afterEach(async () => {
  await dropTestDB();
});

afterAll(async () => {
  await closeTestDB();
});

describe('Testing UserMode', () => {
  it('should create user model', () => {
    const johnDoe = new UserModel({ ...user });
    expect(johnDoe).toBeDefined();
  });

  it('should store password as hashed password', async () => {
    const johnDoe = new UserModel({ ...user });
    await johnDoe.save();
    const [createdUser] = await UserModel.find({ email: user.email }).exec();
    expect(createdUser.password).not.toEqual(user.password);
  });

  it('should throw error when email is already exist', async () => {
    let error: unknown;
    try {
      await UserModel.create([{ ...user }, { ...user }]);
    } catch (err: unknown) {
      error = err;
    }
    expect(error).toBeDefined();
  });
});
