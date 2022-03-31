import { Schema, model, Types } from 'mongoose'

const ProjectSchema = new Schema({
  owner: { type: Types.ObjectId, ref: 'User', required: true },
  members: [{ type: Types.ObjectId, ref: 'User' }],
  name: { type: String, required: true, require: true },
  description: { type: String, required: true }
})

export default model('Project', ProjectSchema)
