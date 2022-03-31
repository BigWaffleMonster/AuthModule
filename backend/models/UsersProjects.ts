import { Schema, model, Types } from 'mongoose'

const UsersProjectsShema = new Schema({
  userd_id: { type: Types.ObjectId, ref: 'User', required: true },
  projects_id: [{ type: Types.ObjectId, ref: 'Projects' }]
})

export default model('UsersProjects', UsersProjectsShema)
