import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "../../../src/utils/db";

const getIndexPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.json(
    await prisma.post.findMany({
      where: {
        author: { idToken: req.headers.authorization },
      },
      include: { author: true },
      orderBy: { createdAt: "desc" },
    })
  );
};

const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
  await prisma.user.update({
    where: {
      idToken: req.headers.authorization,
    },
    data: {
      posts: { create: req.body as Prisma.PostCreateInput },
    },
  });
  return res.json({});
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return getIndexPosts(req, res);
    case "POST":
      return createPost(req, res);
    default:
      return res.status(404);
  }
};
