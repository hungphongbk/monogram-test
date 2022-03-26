import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../src/utils/db";

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
