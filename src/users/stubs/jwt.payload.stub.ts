import { JWTPayload } from '../interfaces/payload.jwt';

export const JWTPayloadStubs = (): JWTPayload => {
  return {
    _id: '507c7f79bcf86cd7994f6c0e',
    email: 'john.doe@mail.com',
    iat: 1669817849,
  };
};
