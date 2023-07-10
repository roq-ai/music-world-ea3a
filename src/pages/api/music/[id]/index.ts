import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { musicValidationSchema } from 'validationSchema/music';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.music
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getMusicById();
    case 'PUT':
      return updateMusicById();
    case 'DELETE':
      return deleteMusicById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMusicById() {
    const data = await prisma.music.findFirst(convertQueryToPrismaUtil(req.query, 'music'));
    return res.status(200).json(data);
  }

  async function updateMusicById() {
    await musicValidationSchema.validate(req.body);
    const data = await prisma.music.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteMusicById() {
    const data = await prisma.music.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
