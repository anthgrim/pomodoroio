import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '../../../lib/mongodb'
import dbConnect from '../../../lib/dbConnect'

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  debug: process.env.NODE_ENV === 'development',
  adapter: MongoDBAdapter(clientPromise)
}

export default NextAuth(authOptions)
