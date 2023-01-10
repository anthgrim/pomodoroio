/* eslint-disable import/no-anonymous-default-export */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import dbConnect from '../../../lib/dbConnect'
import bcrypt from 'bcrypt'
import cookie from 'cookie'
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

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: 'Missing required fields'
    })
  }

  try {
    await dbConnect()

    // Verify if user exist
    const targetUser = await User.findOne({ email }).exec()

    if (!targetUser) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    // Verify password
    const isValidCredential = await bcrypt.compare(
      password,
      targetUser.hashedPassword
    )

    if (!isValidCredential) {
      return res.status(401).json({
        message: 'Invalid password'
      })
    }

    // Create token
    const tokenPayload = {
      id: targetUser._id
    }

    const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET, {
      expiresIn: '1d'
    })

    // Set token as cookie
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
        path: '/'
      })
    )

    return res.status(200).json({
      message: `Welcome ${targetUser.name}!`,
      user: { name: targetUser.name, email: targetUser.email },
      token
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Server Error',
      error: error.message
    })
  }
}
