import { mongo } from 'mongoose';

export const PatchResStub = () => {
  return {
    message: `Todo ${new mongo.ObjectId().toString()} is successfully updated`,
    statusCode: 200,
    error: null,
    data: null,
  };
};
