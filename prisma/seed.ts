import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../app/util/hashPassword';

const prisma = new PrismaClient();

async function main() {
  console.log('INTIALISING DATABASE');
  const module1 = await prisma.modules.create({
    data: {
      title: 'Third Year Project',
      code: 'COMP30020',
      description: 'The third year project module',
    },
  });
  const module2 = await prisma.modules.create({
    data: {
      title: 'Fifth Year Project',
      code: 'COMP50020',
      description: 'The fifth year project module',
    },
  });

  const teacher = await prisma.users.create({
    data: {
      email: 'teacher@example.com',
      username: 't',
      password: await hashPassword('t'),
      type: 'Teacher',
      modules: {
        connectOrCreate: [
          { where: { id: module1.id }, create: module1 },
          { where: { id: module2.id }, create: module2 },
        ],
      },
    },
  });

  const student1 = await prisma.users.create({
    data: {
      email: 'student-1@example.com',
      username: 'Student One',
      password: await hashPassword('1'),
      type: 'Student',
      modules: {
        connectOrCreate: [
          { where: { id: module1.id }, create: module1 },
          { where: { id: module2.id }, create: module2 },
        ],
      },
    },
  });

  const student2 = await prisma.users.create({
    data: {
      email: 'student-2@example.com',
      username: 'Student Two',
      password: await hashPassword('2'),
      type: 'Student',
      modules: {
        connectOrCreate: [
          { where: { id: module1.id }, create: module1 },
          { where: { id: module2.id }, create: module2 },
        ],
      },
    },
  });

  const student3 = await prisma.users.create({
    data: {
      email: 'student-3@example.com',
      username: 'Student 3',
      password: await hashPassword('3'),
      type: 'Student',
      modules: {
        connectOrCreate: [
          { where: { id: module1.id }, create: module1 },
          { where: { id: module2.id }, create: module2 },
        ],
      },
    },
  });

  await prisma.users.create({
    data: {
      email: 'student-4@example.com',
      username: 'Student Four',
      password: await hashPassword('4'),
      type: 'Student',
      modules: {
        connectOrCreate: [
          { where: { id: module1.id }, create: module1 },
          { where: { id: module2.id }, create: module2 },
        ],
      },
    },
  });

  await prisma.users.create({
    data: {
      email: 'student-5@example.com',
      username: 'Student Five',
      password: await hashPassword('5'),
      type: 'Student',
      modules: {
        connectOrCreate: [
          { where: { id: module1.id }, create: module1 },
          { where: { id: module2.id }, create: module2 },
        ],
      },
    },
  });

  const student6 = await prisma.users.create({
    data: {
      email: 'student-6@example.com',
      username: 'Student Six',
      password: await hashPassword('6'),
      type: 'Student',
      modules: {
        connectOrCreate: [
          { where: { id: module1.id }, create: module1 },
          { where: { id: module2.id }, create: module2 },
        ],
      },
    },
  });

  await prisma.users.create({
    data: {
      email: 'student-7@example.com',
      username: 'Student Seven',
      password: await hashPassword('7'),
      type: 'Student',
      modules: {
        connectOrCreate: [
          { where: { id: module1.id }, create: module1 },
          { where: { id: module2.id }, create: module2 },
        ],
      },
    },
  });

  const activityGroup1 = await prisma.userGroups.create({
    data: {
      title: 'group 1',
      participants: {
        connect: [student1, student2, student6],
      },
    },
  });

  const activityGroup2 = await prisma.userGroups.create({
    data: {
      title: 'group 2',
      participants: {
        connect: [student2, student3],
      },
    },
  });

  const activityA = await prisma.activities.create({
    data: {
      title: 'Activity A',
      description: 'A basic quiz',
      duration: 10,
      deadline: new Date('2025-04-27 18:00').toISOString(),
      module: 'COMP30020',
      UserGroups: { connect: [activityGroup1] },
    },
  });
  const activityB = await prisma.activities.create({
    data: {
      title: 'Activity B',
      description: 'A video to watch',
      duration: 15,
      deadline: new Date('2025-04-28 18:00').toISOString(),
      module: 'COMP30020',
      UserGroups: { connect: [activityGroup2] },
    },
  });
  const activityC = await prisma.activities.create({
    data: {
      title: 'Activity C',
      description: 'A more complex quiz',
      duration: 30,
      deadline: new Date('2025-04-28 18:00').toISOString(),
      module: 'COMP30020',
    },
  });
  const activityD = await prisma.activities.create({
    data: {
      title: 'Activity D',
      description: 'An exercise sheet',
      duration: 20,
      deadline: new Date('2025-05-01 18:00').toISOString(),
      module: 'COMP30020',
    },
  });

  const activityE = await prisma.activities.create({
    data: {
      title: 'Activity E',
      description: 'A basic quiz',
      duration: 10,
      deadline: new Date('2025-04-30 18:00').toISOString(),
      module: 'COMP50020',
    },
  });
  const activityF = await prisma.activities.create({
    data: {
      title: 'Activity F',
      description: 'A video to watch',
      duration: 15,
      deadline: new Date('2025-05-05 18:00').toISOString(),
      module: 'COMP50020',
    },
  });
  const activityG = await prisma.activities.create({
    data: {
      title: 'Activity G',
      description: 'A more complex quiz',
      duration: 30,
      deadline: new Date('2025-06-03 18:00').toISOString(),
      module: 'COMP50020',
    },
  });
  const activityH = await prisma.activities.create({
    data: {
      title: 'Activity H',
      description: 'An exercise sheet',
      duration: 20,
      deadline: new Date('2025-05-03 18:00').toISOString(),
      module: 'COMP50020',
    },
  });

  await prisma.media.create({
    data: {
      name: 'Intro to Lecture',
      description: 'The introduction lecture to stuff',
      url: 'SomeLinkGoesHere',
      type: 'Video',
    },
  });
  await prisma.media.create({
    data: {
      name: 'Intro to Lecture 2',
      description: 'The introduction lecture to stuff',
      url: 'SomeLinkGoesHere2',
      type: 'Video',
    },
  });

  const quiz1 = await prisma.quizzes.create({
    data: {
      title: 'Example Quiz 1',
      description: 'An example quiz',
      activity: activityA.id,
    },
  });

  const qq1 = await prisma.quizQuestions.create({
    data: {
      title: 'Quiz Question 1',
      description: 'The first quiz question',
      type: 'radio',
      quiz: quiz1.id,
    },
  });
  await prisma.quizQuestionOrder.create({
    data: {
      quizID: quiz1.id,
      questionID: qq1.id,
      position: 1,
    },
  });
  await prisma.quizQuestionAnswers.create({
    data: {
      title: 'Quiz Answer 1',
      description: 'The first quiz answer',
      correct: false,
      question: qq1.id,
    },
  });
  await prisma.quizQuestionAnswers.create({
    data: {
      title: 'Quiz Answer 2',
      description: 'The second quiz answer',
      correct: false,
      question: qq1.id,
    },
  });
  await prisma.quizQuestionAnswers.create({
    data: {
      title: 'Quiz Answer 3',
      description: 'The third quiz answer',
      correct: true,
      question: qq1.id,
    },
  });
  await prisma.quizQuestionAnswers.create({
    data: {
      title: 'Quiz Answer 4',
      description: 'The fourth quiz answer',
      correct: false,
      question: qq1.id,
    },
  });

  const qq2 = await prisma.quizQuestions.create({
    data: {
      title: 'Quiz Question 2',
      description: 'The second quiz question',
      type: 'text',
      quiz: quiz1.id,
    },
  });
  await prisma.quizQuestionOrder.create({
    data: {
      quizID: quiz1.id,
      questionID: qq2.id,
      position: 2,
    },
  });
  await prisma.quizQuestionAnswers.create({
    data: {
      title: 'answer',
      description: 'The answer to the second question',
      correct: true,
      question: qq2.id,
    },
  });

  const qq3 = await prisma.quizQuestions.create({
    data: {
      title: 'Quiz Question 3',
      description: 'The third quiz question',
      type: 'radio',
      quiz: quiz1.id,
    },
  });
  await prisma.quizQuestionOrder.create({
    data: {
      quizID: quiz1.id,
      questionID: qq3.id,
      position: 3,
    },
  });
  await prisma.quizQuestionAnswers.create({
    data: {
      title: 'Quiz Answer A',
      description: 'The first quiz answer to the third question',
      correct: true,
      question: qq3.id,
    },
  });
  await prisma.quizQuestionAnswers.create({
    data: {
      title: 'Quiz Answer B',
      description: 'The second quiz answer to the third question',
      correct: false,
      question: qq3.id,
    },
  });

  const qq4 = await prisma.quizQuestions.create({
    data: {
      title: 'Quiz Question 4',
      description: 'The fourth quiz question',
      type: 'text',
      quiz: quiz1.id,
    },
  });
  await prisma.quizQuestionOrder.create({
    data: {
      quizID: quiz1.id,
      questionID: qq4.id,
      position: 4,
    },
  });
  await prisma.quizQuestionAnswers.create({
    data: {
      title: 'four',
      description: 'The answer to the fourth question',
      correct: true,
      question: qq4.id,
    },
  });

  const board = await prisma.board.create({
    data: {
      title: 'Test board',
      description: 'Description of test board',
      group: activityGroup1.id,
    },
  });

  await prisma.boardLocation.create({
    data: {
      type: 'Activities',
      activitiesId: activityA.id,
      boardId: board.id,
    },
  });

  const messages = await prisma.post.createManyAndReturn({
    data: [
      {
        content: 'Message 1',
        createdAt: new Date('2024-10-21 18:00').toISOString(),
        userEmail: teacher.email,
        boardID: board.id,
      },
      {
        content: 'Message 2',
        createdAt: new Date('2024-10-21 19:00').toISOString(),
        userEmail: student1.email,
        boardID: board.id,
      },
      {
        content: 'Message 3',
        createdAt: new Date('2024-10-21 20:00').toISOString(),
        userEmail: teacher.email,
        boardID: board.id,
      },
    ],
  });

  await prisma.post.create({
    data: {
      content: 'Reply 1',
      createdAt: new Date('2024-10-21 21:00').toISOString(),
      userEmail: teacher.email,
      boardID: board.id,
      postID: messages[0].id,
    },
  });

  console.log('INITIALISED');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
