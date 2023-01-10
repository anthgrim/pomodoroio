import mongoose, { Schema, models, model } from 'mongoose'

interface User {
  name: string
  email: string
  hashedPassword: string
  avatarUrl?: string
  token?: string
}

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    hashedPassword: {
      type: String,
      required: true,
      minLength: 5
    },
    avatarUrl: {
      type: String
    },
    token: {
      type: String
    }
  },
  { timestamps: true }
)

export default (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model('User', userSchema)
