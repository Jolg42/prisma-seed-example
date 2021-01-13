const dotenv = require("dotenv")
const { PrismaClient } = require("@prisma/client")

dotenv.config()
const prisma = new PrismaClient()

async function main() {
  // To satisfy the unique constraint on email if running the seed multiple times
  const random = Math.random().toString(36).substring(7)
  
  const alice = await prisma.user.create({
    data: {
      email: `alice${random}@prisma.io`,
      name: 'Alice',
      posts: {
        create: {
          title: 'Check out Prisma with Next.js',
          content: 'https://www.prisma.io/nextjs',
          published: true,
        },
      },
    },
  })

  const bob = await prisma.user.create({
    data: {
      email: `bob${random}@prisma.io`,
      name: 'Bob',
      posts: {
        create: [
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma',
            published: true,
          },
          {
            title: 'Follow Nexus on Twitter',
            content: 'https://twitter.com/nexusgql',
            published: true,
          },
        ],
      },
    },
  })
  console.log({ alice, bob })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
