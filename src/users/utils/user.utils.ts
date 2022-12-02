import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWTPayload } from '../interfaces/payload.jwt';

export const encryptPass = (password: string): string => {
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const genJWTToken = (payload: JWTPayload): string => {
  const secret = process.env.JWT_SECRET || 'sekret';
  const jwtToken = jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
  return jwtToken;
};
