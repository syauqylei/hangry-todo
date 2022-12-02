import { compareSync } from 'bcrypt';
import { BadRequest, InternalServerError } from '@curveball/http-errors/dist';
import { AddUserDTO } from '../dtos/add.user.dto';
import { LoginUserDTO } from '../dtos/login.user.dto';
import UserModel from '../models/user.model';
import { JWTPayload } from '../interfaces/payload.jwt';
import { genJWTToken } from '../utils/user.utils';
import { ResponseDTO } from '../../common/dtos/response.dto';
import * as jwt from 'jsonwebtoken';
import { getEnvVar } from '../../common/utils';
import { LogoutUserDTO } from '../dtos/logout.user.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationReqError } from '../../common/errors';

export default class UserService {
  async addUser(reqBody: any): Promise<ResponseDTO<null>> {
    const user = plainToClass(AddUserDTO, reqBody);

    const errs = await validate(user);
    if (errs.length > 0) {
      throw new ValidationReqError(
        'Request body is not in correct format',
        errs,
      );
    }

    const existedUser = await UserModel.findOne({ email: user.email });
    if (existedUser) {
      throw new BadRequest('Email is already existed');
    }

    try {
      await UserModel.create(user);
    } catch (err) {
      throw new InternalServerError('Failed DB operation');
    }

    const ret: ResponseDTO<null> = {
      statusCode: 201,
      message: `User ${user.email} is successfully registered`,
      error: null,
      data: null,
    };
    return ret;
  }

  async loginUser(reqBody: any): Promise<ResponseDTO<string>> {
    const loginData = plainToClass(LoginUserDTO, reqBody);
    const errs = await validate(loginData);

    if (errs.length > 0) {
      throw new ValidationReqError(
        'Request body is not in correct format',
        errs,
      );
    }

    const user = await UserModel.findOne({ email: loginData.email });
    if (!user) {
      throw new BadRequest(`Email or password is not correct`);
    }

    if (!compareSync(loginData.password, user.password)) {
      throw new BadRequest(`Email or password is not correct`);
    }

    const jwtPayload: JWTPayload = {
      _id: user._id.toString(),
      email: user.email,
      iat: Date.now(),
    };

    const jwtToken = genJWTToken(jwtPayload);

    const ret: ResponseDTO<string> = {
      statusCode: 200,
      message: `${user.email} is successfully signed in`,
      data: jwtToken,
      error: null,
    };
    return ret;
  }

  async logoutUser(reqBody: any): Promise<ResponseDTO<null>> {
    const logoutData = plainToClass(LogoutUserDTO, reqBody);
    const errs = await validate(logoutData);

    if (errs.length > 0) {
      throw new ValidationReqError('Request body is not valid format', errs);
    }
    const token = logoutData.token;
    const secret: string = getEnvVar('JWT_SECRET', 'sekret');

    let jwtPayload;
    try {
      jwtPayload = jwt.verify(token, secret) as JWTPayload;
    } catch (err) {
      throw new BadRequest('Failed verify jwt token');
    }

    try {
      await UserModel.findOneAndUpdate(
        { _id: jwtPayload._id },
        {
          $addToSet: {
            invalidToken: token,
          },
        },
      );
    } catch (err) {
      throw new InternalServerError(
        'Failed DB operation: insert invalid token',
      );
    }

    const ret: ResponseDTO<null> = {
      statusCode: 200,
      message: `User ${jwtPayload.email} is successfully signed out`,
      data: null,
      error: null,
    };
    return ret;
  }
}
