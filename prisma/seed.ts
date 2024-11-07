import { PrismaClient, MediaType, QuestionType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('INTIALISING DATABASE');
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
  const activityA = await prisma.activities.create({
    data: {
      title: 'Activity A',
      description: 'A basic quiz',
      duration: 10,
      deadline: new Date('2024-10-11 18:00').toISOString(),
      module: 'COMP30020',
    },
  });
  const activityB = await prisma.activities.create({
    data: {
      title: 'Activity B',
      description: 'A video to watch',
      duration: 15,
      deadline: new Date('2024-10-17 18:00').toISOString(),
      module: 'COMP30020',
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
