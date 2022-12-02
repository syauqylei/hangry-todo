import { ValidationError } from 'class-validator';

export interface ResponseDTO<T> {
  statusCode: number;
  message: string | null;
  data: T;
  error: string | ValidationError[] | null;
}
