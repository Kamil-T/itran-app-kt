import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../lib/prisma";


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res. status(405).json({message: 'Method not allowed'})
  }
  function exclude<User, Key extends keyof User>(
  user: User,
  ...keys: Key[]
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key]
  }
  return user
}

const userData =  JSON.parse(req.body);
  const user = await prisma.user.findUnique({ where:  {email: userData.email} })
  const userWithoutPassword = exclude(user, 'password')

  
    res.json(userWithoutPassword)
    
    
    }