import { NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "../../../src/utils/db";
import withAuthUserTokenAPI, {
  AuthenticatedNextApiRequest,
} from "../../../src/utils/api";

const getIndexPosts = async (
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse
) => {
  const following = await prisma.user.findFirst({
    where: { id: req.User!.id! },
    select: { following: { select: { id: true } } },
  });
  return res.json(
    await prisma.post.findMany({
      where: {
        author: {
          id: {
            in: [
              ...(following?.following.map((user) => user.id) ?? []),
              req.User!.id!,
            ],
          },
        },
      },
      include: { author: true },
      orderBy: { createdAt: "desc" },
    })
  );
};

const createPost = async (
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse
) => {
  await prisma.user.update({
    where: {
      id: req.User!.id!,
    },
    data: {
      posts: { create: req.body as Prisma.PostCreateInput },
    },
  });
  return res.json({});
};

export default withAuthUserTokenAPI(async (req, res) => {
  switch (req.method) {
    case "GET":
      return getIndexPosts(req, res);
    case "POST":
      return createPost(req, res);
    default:
      return res.status(404);
  }
});
