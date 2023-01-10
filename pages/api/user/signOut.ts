/* eslint-disable import/no-anonymous-default-export */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
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

  const cookies = req.cookies
  const token = cookies.token

  if (!token) {
    return res.status(204).end()
  }

  try {
    await dbConnect()

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/'
      })
    )

    const targetUser = await User.findOne({ token }).exec()

    if (!targetUser) {
      return res.status(204).end()
    } else {
      targetUser.token = ''
      await targetUser.save()
      return res.status(204).end()
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Server Error',
      error
    })
  }
}
