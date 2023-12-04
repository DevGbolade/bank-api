import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
