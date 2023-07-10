import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { labelValidationSchema } from 'validationSchema/labels';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getLabels();
    case 'POST':
      return createLabel();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getLabels() {
    const data = await prisma.label
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'label'));
    return res.status(200).json(data);
  }

  async function createLabel() {
    await labelValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.music?.length > 0) {
      const create_music = body.music;
      body.music = {
        create: create_music,
      };
    } else {
      delete body.music;
    }
    const data = await prisma.label.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
