import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function listOthers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await prisma.user.findUnique({
    where: { idToken: req.headers.authorization },
  });
  return res.json(
    await prisma.user.findMany({
      where: {
        NOT: { id: user!.id },
      },
    })
  );
}
