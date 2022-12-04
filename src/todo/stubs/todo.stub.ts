import { faker } from '@faker-js/faker';
import { mongo } from 'mongoose';

export const TodoStubs = () => {
  return [
    {
      _id: new mongo.ObjectId().toString(),
      title: faker.lorem.words(),
      description: faker.lorem.sentence(),
      createdBy: new mongo.ObjectId().toString(),
      assignee: new mongo.ObjectId().toString(),
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },
    {
      _id: new mongo.ObjectId().toString(),
      title: faker.lorem.words(),
      description: faker.lorem.sentence(),
      createdBy: new mongo.ObjectId().toString(),
      assignee: new mongo.ObjectId().toString(),
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },
    {
      _id: new mongo.ObjectId().toString(),
      title: faker.lorem.words(),
      description: faker.lorem.sentence(),
      createdBy: new mongo.ObjectId().toString(),
      assignee: new mongo.ObjectId().toString(),
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },
  ];
};
