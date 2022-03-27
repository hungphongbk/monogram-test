import withAuthUserTokenAPI from "../../../src/utils/api";
import { prisma } from "../../../src/utils/db";

export default withAuthUserTokenAPI(async function doFollow(req, res) {
  const followingId = req.body.id as any;
  await prisma.user.update({
    where: {
      id: req.User!.id,
    },
    data: {
      following: {
        connect: {
          id: followingId,
        },
      },
    },
  });
  await prisma.user.update({
    where: {
      id: followingId,
    },
    data: {
      followedBy: {
        connect: {
          id: req.User!.id,
        },
      },
    },
  });
  return res.json({});
});
