import { IsMongoId, IsOptional } from 'class-validator';

export class FilterTodoDTO {
  @IsOptional()
  @IsMongoId()
  assignee?: string;
}
