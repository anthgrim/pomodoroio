/* eslint-disable import/no-anonymous-default-export */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import bcrypt from 'bcrypt'
import User from '../../../models/userModel'

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> {
  if (req.method !== 'POST') {
    return res.status(400).json({
      message: 'Only POST method allowed'
    })
  }

  const { email, name, password } = req.body

  // Validate required fields
  if (!email || !name || !password) {
    return res.status(400).json({
      message: 'Missing required fields'
    })
  }

  try {
    // Connect to database
    await dbConnect()

    // Verify if the user already exist
    const isDuplicate = await User.findOne({ email }).exec()

    if (isDuplicate) {
      return res.status(409).json({
        message: `Email ${email} is already registered`
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    await User.create({
      name,
      email,
      hashedPassword
    })

    return res.status(200).json({
      message: 'User created successfully'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Server Error',
      error: error.message
    })
  }
}
