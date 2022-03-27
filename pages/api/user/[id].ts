import withAuthUserTokenAPI from "../../../src/utils/api";
import { prisma } from "../../../src/utils/db";

export default withAuthUserTokenAPI(async (req, res) => {
  const user = await prisma.user.update({
    where: {
      id: req.User!.id,
    },
    data: req.body as any,
  });
  return res.json(user);
});
