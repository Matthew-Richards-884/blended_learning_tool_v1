import { Prisma, PrismaClient } from '@prisma/client';
import crypto, { UUID } from 'node:crypto';

import { createServerFn } from '@tanstack/start';

const prisma = new PrismaClient();

export function hashPassword(password: string) {
  return new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(password, 'salt', 100000, 64, 'sha256', (err, derivedKey) => {
      if (err) {
        reject(err);
      } else {
        resolve(derivedKey.toString('hex'));
      }
    });
  });
}

export const getActivities = createServerFn('GET', async () => {
  return await prisma.activities.findMany({
    orderBy: { deadline: 'asc' },
  });
});

export const getActivity = createServerFn('GET', async (id: string) => {
  return await prisma.activities.findFirst({
    where: {
      id: id,
    },
  });
});

export const getAllQuizInfo = createServerFn('GET', async (quiz: string) => {
  return await prisma.quizQuestions.findMany({
    where: {
      quiz: quiz,
    },
    include: {
      QuizQuestionAnswers: {
        select: {
          id: true,
          title: true,
          description: true,
          question: true,
          correct: true,
        },
      },
    },
  });
});

export const getAllQuizMCQInfo = createServerFn('GET', async (quiz: string) => {
  return await prisma.quizQuestions.findMany({
    where: {
      quiz: quiz,
      type: 'radio',
    },
    include: {
      QuizQuestionAnswers: {
        select: {
          id: true,
          title: true,
          description: true,
          question: true,
          correct: false,
        },
      },
    },
  });
});

export const getQuizQuestionOrder = createServerFn(
  'GET',
  async (quiz: string) => {
    return await prisma.quizQuestionOrder.findMany({
      where: {
        quizID: quiz,
      },
    });
  }
);

export const getAllQuizTextInfo = createServerFn(
  'GET',
  async (quiz: string) => {
    return await prisma.quizQuestions.findMany({
      where: {
        quiz: quiz,
        type: 'text',
      },
    });
  }
);

export const getQuizzesByActivity = createServerFn(
  'GET',
  async (activity: string) => {
    return await prisma.quizzes.findMany({
      where: {
        activity: activity,
      },
    });
  }
);

export const getQuizQuestion = createServerFn('GET', async (id: string) => {
  return await prisma.quizQuestions.findFirst({
    where: {
      id: id,
    },
  });
});

export const getQuizQuestions = createServerFn('GET', async (quiz: string) => {
  return await prisma.quizQuestions.findMany({
    where: {
      quiz: quiz,
    },
  });
});

export const createQuizSubmission = createServerFn(
  'GET',
  async (params: { quizID: string; userID: string; completeDate: Date }) => {
    return await prisma.quizSubmissions.create({
      data: {
        quizID: params.quizID,
        userID: params.userID,
        completeDate: params.completeDate,
      },
    });
  }
);

export type responseType = { data: Prisma.QuizResponsesGetPayload<{}>[] };

export const createQuizResponse = createServerFn(
  'GET',
  async (data: responseType) => {
    return await prisma.quizResponses.createMany(data);
  }
);

export const getQuizQuestionAnswers = createServerFn(
  'GET',
  async (question: string) => {
    return await prisma.quizQuestionAnswers.findMany({
      where: {
        question: question,
      },
    });
  }
);

export const getModules = createServerFn('GET', async () => {
  return await prisma.modules.findMany();
});

export const getModule = createServerFn('GET', async (code: string) => {
  return await prisma.modules.findFirst({ where: { code: code } });
});

export const getActivitiesByModule = createServerFn(
  'GET',
  async (module: string) => {
    return await prisma.activities.findMany({ where: { module: module } });
  }
);
