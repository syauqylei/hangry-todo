import { mongo } from 'mongoose';

export const AddTodoStubs = () => {
  return {
    title: 'Research Go Backend framework',
    description:
      'There are few popular frameworks to build backend system using Go. For instances, gin, fiber etc. Please do comparative study about those frameworks.',
    dueDate: new Date(Date.now() + 60 * 60 * 1000),
    createdBy: new mongo.ObjectId().toString(),
    assignee: new mongo.ObjectId().toString(),
  };
};
