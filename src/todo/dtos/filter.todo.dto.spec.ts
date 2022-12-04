import { plainToClass } from 'class-transformer';
import { isMongoId, validate } from 'class-validator';
import { FilterTodoStubs } from '../stubs/filter.todo.stub';
import { FilterTodoDTO } from './filter.todo.dto';

describe('Testing FilterTodoDTO', () => {
  let payload: any;
  beforeEach(() => {
    payload = FilterTodoStubs();
  });

  it('should not accept when assignee is not mongo id', async () => {
    payload.assignee = 'aaklsdjas';
    const req = plainToClass(FilterTodoDTO, payload);
    const errs = await validate(req);
    expect(errs.length).toBeTruthy();
  });
});
