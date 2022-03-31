import {Schema, model, Types} from 'mongoose'

const TokenSchema = new Schema({
  user_id: { type: Types.ObjectId, ref: 'User', required: true },
  refreshToken: { type: String, required: true }
})

export default model('Token', TokenSchema)
