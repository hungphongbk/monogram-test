import { PrismaClient } from "@prisma/client";
import { users } from "./seeds/users";
import { omit } from "lodash";

const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    users.map((u) =>
      prisma.user.upsert({
        where: { email: u.email },
        update: omit(u, ["email"]),
        create: u,
      })
    )
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
