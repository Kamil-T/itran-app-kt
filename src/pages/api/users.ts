import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res. status(405).json({message: 'Method not allowed'})
  }
    const userData =  JSON.parse(req.body);
    const savedUser = await prisma.user.create({
      data: userData
    })

    res.json(savedUser)

  }

export const deleteItems = (id) =>
  prisma.collection.deleteMany({
    where: { userId: id },
  });

export const deleteCollections = (id) =>
  prisma.collection.deleteMany({
    where: { userId: id },
  });

const deleteUser = (id) =>
  prisma.user.delete({
    where: { id: id },
  });

export const transaction = async (id) =>
  await prisma.$transaction([
    deleteItems(id),
    deleteCollections(id),
    deleteUser(id),
  ]);
 