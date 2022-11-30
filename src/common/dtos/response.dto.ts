export interface ResponseDTO<T> {
  statusCode: number;
  message: string;
  data: T;
  error: string;
}
