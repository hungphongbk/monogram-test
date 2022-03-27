import withAuthUserTokenAPI from "../../../src/utils/api";
import { prisma } from "../../../src/utils/db";

export default withAuthUserTokenAPI(async function listOthers(req, res) {
  return res.json(
    await prisma.user.findMany({
      where: {
        NOT: { id: req.User!.id },
      },
    })
  );
});
