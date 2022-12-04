import { mongo } from 'mongoose';

export const DeleteResStub = () => {
  return {
    message: `Todo ${new mongo.ObjectId().toString()} is successfully deleted`,
    data: null,
    error: null,
    statusCode: 200,
  };
};
