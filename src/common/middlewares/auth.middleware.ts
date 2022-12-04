import { NextFunction, Request, Response } from 'express';
import { ResponseDTO } from '../dtos/response.dto';
import * as jwt from 'jsonwebtoken';
import { getEnvVar } from '../utils';
import UserModel from '../../users/models/user.model';
import { JWTPayload } from '../../users/interfaces/payload.jwt';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const errorJSON: ResponseDTO<null> = {
    message: null,
    statusCode: 401,
    data: null,
    error: 'Unauthorized',
  };
  const authorization: any = req.headers.authorization;

  if (!authorization) {
    errorJSON.message = 'Authorization header is not provided';
    res.status(401).json(errorJSON);
  } else {
    if (authorization.search('Bearer ') === -1) {
      errorJSON.message = 'Authorization header Bearer keyword is not provided';
      res.status(401).json(errorJSON);
    } else {
      const token = authorization.replace('Bearer ', '');
      let payloadJwt: JWTPayload;
      let user;

      try {
        payloadJwt = jwt.verify(
          token,
          getEnvVar('JWT_SECRET', 'sekret'),
        ) as JWTPayload;

        user = await UserModel.findOne({
          _id: payloadJwt._id,
          email: payloadJwt.email,
        });

        if (!user) {
          errorJSON.message = 'Token verification failed';
          res.status(401).json(errorJSON);
        } else {
          req.session.user = user;
          console.log(user);
          next();
        }
      } catch (error) {
        errorJSON.message = 'Token verification failed';
        res.status(401).json(errorJSON);
      }
    }
  }
};
