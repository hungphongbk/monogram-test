import { SSRPropGetter } from "next-firebase-auth";
import { PrismaClient } from "@prisma/client";
import { omit } from "lodash";

const prisma = new PrismaClient();
export const afterLogin: SSRPropGetter = async ({ AuthUser }) => {
  // Optionally, get other props.
  let dbUser;
  const email = AuthUser.email!;
  dbUser = await prisma.user.findUnique({ where: { email } });

  if (!dbUser)
    dbUser = await prisma.user.create({
      data: {
        displayName: AuthUser.displayName,
        name: AuthUser.email!.split("@")[0],
        email: AuthUser.email!,
        image: AuthUser.photoURL,
      },
    });
  console.log(dbUser);

  return {
    props: {
      user: omit(dbUser, ["createdAt", "updatedAt"]),
    },
  };
};