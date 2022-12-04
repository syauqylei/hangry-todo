import { IsIn, IsMongoId } from "class-validator";

export class PatchParamsDTO {
  @IsIn(['todo','inprogress','done'])
  status: string;

  @IsMongoId()
  todoId: string;
}
