import { model, Schema } from 'mongoose';
import UserModel from '../../users/models/user.model';

export interface ITodo {
  title: string;
  description: string;
  status: string;
  dueDate: Date;
  createdBy: string;
  assignee: string;
}

const todoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['todo', 'inprogress', 'done'],
      default: 'todo',
    },
    description: {
      type: String,
    },
    dueDate: {
      type: Date,
    },
    createdBy: {
      type: String,
      required: true,
      validate: {
        validator: async (_id: any) => {
          if (await UserModel.countDocuments({ _id })) {
            return true;
          }
          return false;
        },
        message: 'User does not exist',
      },
    },
    assignee: {
      type: String,
      validate: {
        validator: async (_id: any) => {
          if (await UserModel.countDocuments({ _id })) {
            return true;
          }
          return false;
        },
        message: 'User does not exist',
      },
    },
  },
  {
    timestamps: true,
  },
);

const TodoModel = model<ITodo>('Todos', todoSchema);

export default TodoModel;
