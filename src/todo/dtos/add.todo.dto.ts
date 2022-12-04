import 'reflect-metadata';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsMongoId, IsNotEmpty, MaxLength, MinDate } from 'class-validator';

export class AddTodoDTO {
  @MaxLength(90)
  @IsNotEmpty()
  title: string;

  @MinDate(new Date())
  @IsDate()
  @Type( () => Date)
  dueDate: Date;

  description: string;

  @IsMongoId()
  createdBy: string;

  @IsMongoId()
  assignee: string;
}
