import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { PatchParamStub } from "../stubs/patch.params.stub";
import { PatchParamsDTO } from "./patch.params.todo.dto";

describe('Testing PatchParamsDTO', () => {
  let payload:any;
  beforeEach(() => {
    payload = PatchParamStub();
  })
  it('should not accept todoId that is not mongoId', async () => {
    payload.todoId = 'asdasd';
    const req = plainToClass(PatchParamsDTO,payload);
    const errs = await validate(req);
    expect(errs.length).toBeTruthy();
  })
  it('should not accept status that is not todo, done, inprogress', async () => {
    payload.status = 'asdasd';
    const req = plainToClass(PatchParamsDTO,payload);
    const errs = await validate(req);
    expect(errs.length).toBeTruthy();
  })
})
