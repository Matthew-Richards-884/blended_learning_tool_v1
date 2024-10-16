import { PrismaClient, MediaType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("INTIALISING DATABASE")
  await prisma.modules.create({
    data: {
      title: 'Third Year Project',
      code: 'COMP30020',
      description: 'The third year project module',
    },
  });
  await prisma.modules.create({
    data: {
      title: 'Fifth Year Project',
      code: 'COMP50020',
      description: 'The fifth year project module',
    },
  });
  await prisma.activities.create({
    data: {
      title: 'Activity A',
      description: 'A basic quiz',
      duration: 10,
      deadline: new Date('2024-10-11 18:00').toISOString(),
      module: 'COMP30020',
    },
  });
  await prisma.activities.create({
    data: {
      title: 'Activity B',
      description: 'A video to watch',
      duration: 15,
      deadline: new Date('2024-10-17 18:00').toISOString(),
      module: 'COMP30020',
    },
  });
  await prisma.activities.create({
    data: {
      title: 'Activity C',
      description: 'A more complex quiz',
      duration: 30,
      deadline: new Date('2024-10-15 18:00').toISOString(),
      module: 'COMP30020',
    },
  });
  await prisma.activities.create({
    data: {
      title: 'Activity D',
      description: 'An exercise sheet',
      duration: 20,
      deadline: new Date('2024-10-21 18:00').toISOString(),
      module: 'COMP30020',
    },
  });

  await prisma.activities.create({
    data: {
      title: 'Activity E',
      description: 'A basic quiz',
      duration: 10,
      deadline: new Date('2024-10-11 18:00').toISOString(),
      module: 'COMP50020',
    },
  });
  await prisma.activities.create({
    data: {
      title: 'Activity F',
      description: 'A video to watch',
      duration: 15,
      deadline: new Date('2024-10-17 18:00').toISOString(),
      module: 'COMP50020',
    },
  });
  await prisma.activities.create({
    data: {
      title: 'Activity G',
      description: 'A more complex quiz',
      duration: 30,
      deadline: new Date('2024-10-15 18:00').toISOString(),
      module: 'COMP50020',
    },
  });
  await prisma.activities.create({
    data: {
      title: 'Activity H',
      description: 'An exercise sheet',
      duration: 20,
      deadline: new Date('2024-10-21 18:00').toISOString(),
      module: 'COMP50020',
    },
  });

  await prisma.media.create({
    data: {
      name: 'Intro to Lecture',
      description: 'The introduction lecture to stuff',
      url: 'SomeLinkGoesHere',
      type: MediaType.Video,
    },
  });
  await prisma.media.create({
    data: {
      name: 'Intro to Lecture 2',
      description: 'The introduction lecture to stuff',
      url: 'SomeLinkGoesHere2',
      type: MediaType.Video,
    },
  });

  console.log("INITIALISED")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })