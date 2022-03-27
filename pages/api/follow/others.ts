import withAuthUserTokenAPI from "../../../src/utils/api";
import { prisma } from "../../../src/utils/db";

export default withAuthUserTokenAPI(async function listOthers(req, res) {
  const users = await prisma.user.findMany({
    where: {
      NOT: { id: req.User!.id },
    },
    include: { followedBy: true },
  });

  return res.json(
    users.map((user) => {
      return {
        ...user,
        followByMe: user.followedBy.some((f) => f.id === req.User!.id),
      };
    })
  );
});
