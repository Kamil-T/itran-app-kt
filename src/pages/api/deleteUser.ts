import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'DELETE') {
    return res.status(405).json({message: 'Method not allowed'})
  }
   const id = JSON.parse(req.body)
   console.log(id)

 const deleteItems =
  prisma.collection.deleteMany({
    where: { userId: id },
  });

 const deleteCollections =
  prisma.collection.deleteMany({
    where: { userId: id },
  });

const deleteUser =
  prisma.user.delete({
    where: { id: id },
  });

 const transaction =
  await prisma.$transaction([
    deleteItems,
    deleteCollections,
    deleteUser,
  ]);

  
    return res.json(transaction)
  }
