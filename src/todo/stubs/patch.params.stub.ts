import { mongo } from "mongoose"

export const PatchParamStub = () => {
  return  {
    todoId: new mongo.ObjectId().toString(),
    status: 'done'
  }
}
