import { BadRequest, InternalServerError } from '@curveball/http-errors/dist';
import { ResponseDTO } from '../../common/dtos/response.dto';
import { AddUserDTO } from '../dtos/add.user.dto';
import UserModel from '../models/user.model';

export default class UserService {
  async addUser(user: AddUserDTO): Promise<string> {
    const existedUser = await UserModel.findOne({ email: user.email });
    if (existedUser) {
      throw new BadRequest('Email is already existed');
    }
    try {
      await UserModel.create(user);
    } catch (err) {
      throw new InternalServerError('Failed DB operation');
    }
    return user.email;
  }
}
