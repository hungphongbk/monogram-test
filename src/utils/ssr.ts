import { SSRPropGetter } from "next-firebase-auth";
import { omit } from "lodash";
import { prisma } from "./db";

export const afterLogin: SSRPropGetter = async ({ AuthUser }) => {
  // Optionally, get other props.
  let dbUser;
  const id = AuthUser.id!;
  dbUser = await prisma.user.findUnique({ where: { id } });

  if (!dbUser)
    dbUser = await prisma.user.create({
      data: {
        id: AuthUser.id!,
        displayName: AuthUser.displayName,
        name: AuthUser.email!.split("@")[0],
        email: AuthUser.email!,
        image: AuthUser.photoURL,
        idToken: (await AuthUser.getIdToken())!,
      },
    });
  else {
    dbUser = await prisma.user.update({
      where: {
        id: dbUser.id,
      },
      data: {
        idToken: (await AuthUser.getIdToken())!,
      },
    });
  }

  return {
    props: {
      profile: omit(dbUser, ["createdAt", "updatedAt"]),
    },
  };
};
