import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PATCH') {
    return res. status(405).json({message: 'Method not allowed'})
  }
    const userData = JSON.parse(req.body)
    const updateUser = await prisma.user.update({
      where: { id: userData.id }
    , data: {blocked: userData.blocked, admin: userData.admin}})

    return res.json(updateUser)
    
    

  }