import { mongo } from 'mongoose';

export const FilterTodoStubs = () => {
  return {
    assignee: new mongo.ObjectId().toString(),
    page: 1,
  };
};
