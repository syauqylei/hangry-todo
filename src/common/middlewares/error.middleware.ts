import { HttpErrorBase, isHttpError } from '@curveball/http-errors/dist';
import { classToPlain } from 'class-transformer';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ResponseDTO } from '../dtos/response.dto';

export const errorHandler = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const ret: ResponseDTO<null> = {
    statusCode: 500,
    message: err.toString(),
    data: null,
    error: err.toString(),
  };
  if (isHttpError(err)) {
    const newErr = classToPlain(err);
    ret.statusCode = err.httpStatus;
    ret.error = newErr.validationErrors || newErr.title;
  }
  res.status(ret.statusCode).json(ret);
};
