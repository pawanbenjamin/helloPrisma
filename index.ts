import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    await prisma.user.create({
      data: {
        name: 'Bart',
        email: 'alicewerwe@prisma.io',
        posts: {
          create: { title: 'Hello World', content: 'Heres my content' },
        },
        profile: {
          create: { bio: 'I like turtles' },
        },
      },
    })
  } catch (error) {
    throw error
  }

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,

      profile: true,
    },
  })

  console.dir(allUsers, { depth: null })
}

main()
  .catch((e) => {
    console.dir(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
