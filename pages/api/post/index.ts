import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await prisma.user.findUnique({
    where: { idToken: req.headers.authorization },
  });
  const post = await prisma.post.create({
    data: req.body as Prisma.PostCreateInput,
  });
  return res.json({});
};
