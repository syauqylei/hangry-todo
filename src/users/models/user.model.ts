import { model, Schema } from 'mongoose';
import { encryptPass } from '../utils/user.utils';

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', function (next) {
  if (!this.isModified) {
    next()
  }
  this.password = encryptPass(this.password)
  next()
})

const UserModel = model<IUser>('User', userSchema);

export default UserModel;
