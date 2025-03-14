import { PrismaClient, MediaType, QuestionType } from '@prisma/client';
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
      email: 't@t.com',
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
      email: 'u@u.com',
      username: 'u',
      password: await hashPassword('u'),
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
      email: 'b@b.com',
      username: 'b',
      password: await hashPassword('b'),
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
      email: 'c@c.com',
      username: 'c',
      password: await hashPassword('c'),
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
      email: 'd@d.com',
      username: 'd',
      password: await hashPassword('d'),
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
      email: 'e@e.com',
      username: 'e',
      password: await hashPassword('e'),
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
      email: 'f@f.com',
      username: 'f',
      password: await hashPassword('f'),
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
      email: 'g@g.com',
      username: 'g',
      password: await hashPassword('g'),
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
        connect: [student1, student2],
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
      deadline: new Date('2024-10-11 18:00').toISOString(),
      module: 'COMP30020',
      UserGroups: { connect: [activityGroup1] },
    },
  });
  const activityB = await prisma.activities.create({
    data: {
      title: 'Activity B',
      description: 'A video to watch',
      duration: 15,
      deadline: new Date('2024-10-17 18:00').toISOString(),
      module: 'COMP30020',
      UserGroups: { connect: [activityGroup2] },
    },
  });
  const activityC = await prisma.activities.create({
    data: {
      title: 'Activity C',
      description: 'A more complex quiz',
      duration: 30,
      deadline: new Date('2024-10-15 18:00').toISOString(),
      module: 'COMP30020',
    },
  });
  const activityD = await prisma.activities.create({
    data: {
      title: 'Activity D',
      description: 'An exercise sheet',
      duration: 20,
      deadline: new Date('2024-10-21 18:00').toISOString(),
      module: 'COMP30020',
    },
  });

  const activityE = await prisma.activities.create({
    data: {
      title: 'Activity E',
      description: 'A basic quiz',
      duration: 10,
      deadline: new Date('2024-10-11 18:00').toISOString(),
      module: 'COMP50020',
    },
  });
  const activityF = await prisma.activities.create({
    data: {
      title: 'Activity F',
      description: 'A video to watch',
      duration: 15,
      deadline: new Date('2024-10-17 18:00').toISOString(),
      module: 'COMP50020',
    },
  });
  const activityG = await prisma.activities.create({
    data: {
      title: 'Activity G',
      description: 'A more complex quiz',
      duration: 30,
      deadline: new Date('2024-10-15 18:00').toISOString(),
      module: 'COMP50020',
    },
  });
  const activityH = await prisma.activities.create({
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
      type: QuestionType.radio,
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
      type: QuestionType.text,
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
      type: QuestionType.radio,
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
      type: QuestionType.text,
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
