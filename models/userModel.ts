import { Schema, models, model } from 'mongoose'

const userSchema = new Schema(
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
    }
  },
  { timestamps: true }
)

const User = models.User || model('User', userSchema)

export default User
