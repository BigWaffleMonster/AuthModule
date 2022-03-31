import { Schema, model, Types } from 'mongoose'

const TaskSchema = new Schema({
  title: { type: String, required: true, unique: true },
  text: { type: String, required: true },
  staus: { type: String, required: true },
  assigne: { type: Types.ObjectId, ref: 'User', required: true },
  assigned_to: { type: Types.ObjectId, ref: 'User', required: true },
  deadline: { type: Date, required: true }
})

export default model('Task', TaskSchema)
