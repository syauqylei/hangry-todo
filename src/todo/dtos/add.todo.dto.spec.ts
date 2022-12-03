import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { AddTodoStubs } from '../stubs/add.todo.stubs';
import { AddTodoDTO } from './add.todo.dto';

describe('Testing AddTodoDTO', () => {
  let payload: any;

  beforeEach(() => {
    payload = AddTodoStubs();
  });

  it('should not accept empty string', async () => {
    payload.title = '';
    const req = plainToClass(AddTodoDTO, payload);
    const err = await validate(req);
    expect(err.length).toBeTruthy();
  });

  it('should not accept title longer 140', async () => {
    payload.title = `111111111111111111111111
    11111111111111111111111111111111111asjkldjlasdkjl
    asdkjaslkdjaslkjdlkasjdklasjkldjaslkjdlkasjdklsajkld`;
    const req = plainToClass(AddTodoDTO, payload);
    const err = await validate(req);
    expect(err.length).toBeTruthy();
  });

  it('should not accept due date before now', async () => {
    payload.dueDate = new Date(Date.now() - 60 * 60 * 1000);
    const req = plainToClass(AddTodoDTO, payload);
    const err = await validate(req);
    expect(err.length).toBeTruthy();
  });

  it('should not accept when createdBy is not in format object id', async () => {
    payload.createdBy = 'asdkgadsh';
    const req = plainToClass(AddTodoDTO, payload);
    const err = await validate(req);
    expect(err.length).toBeTruthy();
  });

  it('should not accept when assignee is not in format object id', async () => {
    payload.assignee = 'asdkgadsh';
    const req = plainToClass(AddTodoDTO, payload);
    const err = await validate(req);
    expect(err.length).toBeTruthy();
  });
});
