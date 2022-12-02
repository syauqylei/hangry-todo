import { AddUserDTO } from '../dtos/add.user.dto';
import { JWTPayload } from '../interfaces/payload.jwt';
import { JWTPayloadStubs } from '../stubs/jwt.payload.stub';
import { userStub } from '../stubs/user.stub';
import { encryptPass, genJWTToken } from './user.utils';

let user: AddUserDTO;
let jwtPayload: JWTPayload;
beforeEach(() => {
  user = userStub();
  jwtPayload = JWTPayloadStubs();
});
describe('Testing user utils', () => {
  it('should return hashed string', () => {
    const hashed = encryptPass(user.password);
    expect(hashed).not.toEqual(user.password);
  });

  it('should return jwtToken from jwtPayload', () => {
    const payload: JWTPayload = jwtPayload;
    const ret = genJWTToken(payload);
    expect(ret).toEqual(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1MDdjN2Y3OWJjZjg2Y2Q3OTk0ZjZjMGUiLCJlbWFpbCI6ImpvaG4uZG9lQG1haWwuY29tIiwiaWF0IjoxNjY5ODE3ODQ5LCJleHAiOjE2Njk4MjE0NDl9.r0c69_3mFmLbmeb9nJ_PGH4Cxc49I6KZzhOtevb0HBg',
    );
  });
});
