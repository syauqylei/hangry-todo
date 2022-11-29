import * as bcrypt from "bcrypt";


export const encryptPass = (password: string): string => {
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(password, salt)
  return hash;
}
