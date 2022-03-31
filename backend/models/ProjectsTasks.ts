import { Schema, model, Types } from 'mongoose'

const ProjectsTasksSchema = new Schema({
  project_id: { type: Types.ObjectId, ref: 'Project', required: true },
  task_id: [{ type: Types.ObjectId, ref: 'Task' }]
})

export default model('ProjectsTasks', ProjectsTasksSchema)
