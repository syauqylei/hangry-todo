import { IsMongoId, IsNotEmpty, MaxLength, MinDate } from 'class-validator';
import { isObjectIdOrHexString } from 'mongoose';

export class AddTodoDTO {
  @MaxLength(90)
  @IsNotEmpty()
  title: string;

  @MinDate(new Date())
  dueDate: Date;

  description: string;

  @IsMongoId()
  createdBy: string;

  @IsMongoId()
  assignee: string;
}
