import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../src/utils/db";

export default async function doFollow(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await prisma.user.findUnique({
    where: { idToken: req.headers.authorization },
  });
}
