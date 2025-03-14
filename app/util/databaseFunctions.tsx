import {
  Activities,
  Prisma,
  PrismaClient,
  QuizQuestionAnswers,
  QuizQuestionOrder,
  QuizQuestions,
  Quizzes,
  UserGroups,
  Users,
} from '@prisma/client';

import { createServerFn, Fetcher } from '@tanstack/start';
import { LocationType } from '../../prisma/types';

const prisma = new PrismaClient();

export const getActivities = createServerFn('GET', async () => {
  return await prisma.activities.findMany({
    orderBy: { deadline: 'asc' },
  });
});

export const getUserActivities = createServerFn(
  'GET',
  async (email: string) => {
    return await prisma.activities.findMany({
      where: { Modules: { Users: { some: { email: email } } } },
      orderBy: { deadline: 'asc' },
      include: { Modules: true },
    });
  }
);

export const getActivity = createServerFn('GET', async (id: string) => {
  return await prisma.activities.findFirst({
    where: {
      id: id,
    },
  });
});

export const getAllQuizInfo = createServerFn('GET', async (quiz: string) => {
  return await prisma.quizzes.findUnique({
    where: {
      id: quiz,
    },
    include: {
      questions: {
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
      },
      QuizQuestionOrder: {
        where: {
          quizID: quiz,
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

export const getQuizCardsInfo = createServerFn(
  'GET',
  async (activityID: string) => {
    return await prisma.quizzes.findMany({
      where: {
        activity: activityID,
      },
      include: {
        _count: {
          select: {
            questions: true,
          },
        },
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

export const updateQuiz = createServerFn(
  'GET',
  async (
    quizInfo: Quizzes & {
      questions: (QuizQuestions & {
        QuizQuestionAnswers: QuizQuestionAnswers[];
      })[];
      QuizQuestionOrder: QuizQuestionOrder[];
    }
  ) => {
    return await prisma.quizzes.update({
      where: {
        id: quizInfo.id,
      },
      data: {
        id: quizInfo.id,
        title: quizInfo.title,
        description: quizInfo.description,
        activity: quizInfo.activity,
        questions: {
          deleteMany: {},
          create: [
            ...quizInfo.questions.map(({ quiz, ...questionInfo }) => {
              return {
                ...questionInfo,
                QuizQuestionAnswers: {
                  create: questionInfo.QuizQuestionAnswers.map(
                    ({ question, ...answer }) => answer
                  ),
                },
              };
            }),
          ],
        },
        QuizQuestionOrder: {
          deleteMany: {},
          create: quizInfo.QuizQuestionOrder.map(
            ({ quizID, ...order }) => order
          ),
        },
      },
    });
  }
);

export const getBoard = createServerFn('GET', async (boardCode: string) => {
  return await prisma.board.findFirst({
    where: {
      id: boardCode,
    },
  });
});

export const getBoardByModule = createServerFn(
  'GET',
  async (module: string) => {
    return await prisma.board.findFirst({
      where: {
        BoardLocation: { some: { modulesId: module } },
      },
    });
  }
);

export const getBoardInfoByModule = createServerFn(
  'GET',
  async (module: string) => {
    return await prisma.board.findFirst({
      where: {
        BoardLocation: { some: { modulesId: module } },
      },
      include: {
        Post: true,
      },
    });
  }
);

export const getBoardByActivity = createServerFn(
  'GET',
  async (activity: string) => {
    return await prisma.board.findFirst({
      where: {
        BoardLocation: { some: { activitiesId: activity } },
      },
    });
  }
);

export const getBoardByActivityGroup = createServerFn(
  'GET',
  async (params: { activity: string; group: string }) => {
    return await prisma.board.findFirst({
      where: {
        group: params.group,
        BoardLocation: { some: { activitiesId: params.activity } },
      },
    });
  }
);

export const getBoardInfo = createServerFn('GET', async (boardCode: string) => {
  return await prisma.board.findFirst({
    where: {
      id: boardCode,
    },
    include: {
      Post: true,
    },
  });
});

export const createMessage = createServerFn(
  'GET',
  async ({
    boardCode,
    post,
    userEmail,
    postID,
    privateMessage,
  }: {
    boardCode: string;
    post: string;
    userEmail: string;
    postID?: string;
    privateMessage: boolean;
  }) => {
    return await prisma.post.create({
      data: {
        boardID: boardCode,
        content: post,
        userEmail: userEmail,
        postID: postID,
        private: privateMessage,
      },
    });
  }
);

export const createBoard = createServerFn(
  'GET',
  async ({
    id,
    title,
    description,
    defaultPrivate,
    locationType,
    locationID,
  }: {
    id: string;
    title: string;
    description: string;
    defaultPrivate: boolean;
    locationType: LocationType;
    locationID: string;
  }) => {
    return await prisma.board.create({
      data: {
        id: id,
        title: title,
        description: description,
        defaultPrivate: defaultPrivate,
        BoardLocation: {
          create: {
            type: locationType,
            [locationType === 'Activities'
              ? 'activitiesId'
              : locationType === 'Modules'
                ? 'modulesId'
                : 'quizzesId']: locationID,
          },
        },
      },
    });
  }
);

export const createQuizSubmission = createServerFn(
  'GET',
  async (params: { quizID: string; users: Users[]; completeDate: Date }) => {
    return await prisma.quizSubmissions.create({
      data: {
        quizID: params.quizID,
        Users: { connect: params.users },
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

export const deleteQuiz = createServerFn('GET', async (quizID: string) => {
  return await prisma.quizzes.delete({ where: { id: quizID } });
});

export const createActivity = createServerFn(
  'GET',
  async (data: Activities) => {
    return await prisma.activities.create({ data: data });
  }
);

export type createQuizType = Quizzes & {
  questions: {
    create: (Prisma.QuizQuestionsUncheckedCreateWithoutQuizzesInput & {
      QuizQuestionAnswers: {
        create: Prisma.QuizQuestionAnswersCreateWithoutQuizQuestionsInput[];
      };
    })[];
  };
  QuizQuestionOrder: {
    create: Prisma.QuizQuestionOrderUncheckedCreateWithoutQuizzesInput[];
  };
};

export const createQuiz = createServerFn(
  'GET',
  async (data: createQuizType) => {
    return await prisma.quizzes.create({ data: data });
  }
);

export type createGroupsType = {
  activity: string;
  groups: (UserGroups & {
    participants: {
      connect: { email: string }[];
    };
  })[];
};

export const createGroups = createServerFn(
  'GET',
  async (data: createGroupsType) => {
    return await prisma.$transaction([
      prisma.userGroups.deleteMany({
        where: { Activities: { some: { id: data.activity } } },
      }),
      ...data.groups.map((g) =>
        prisma.userGroups.create({
          data: { ...g, Activities: { connect: { id: data.activity } } },
        })
      ),
    ]);
  }
);

export const updateActivity = createServerFn(
  'GET',
  async (data: Activities) => {
    return await prisma.activities.update({
      where: { id: data.id },
      data: data,
    });
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

export const getUserByEmail = createServerFn('GET', async (email: string) => {
  return await prisma.users.findFirst({
    where: { email: email },
  });
});

export const getUserModules = createServerFn('GET', async (email: string) => {
  return await prisma.modules.findMany({
    where: { Users: { some: { email: email } } },
  });
});

export const getActivitiesByModule: Fetcher<string, Activities[]> =
  createServerFn('GET', async (module: string) => {
    return await prisma.activities.findMany({ where: { module: module } });
  });

export const getGroup = createServerFn('GET', async (id: string) => {
  return await prisma.userGroups.findFirst({ where: { id: id } });
});

export const getGroupByUserActivity = createServerFn(
  'GET',
  async (params: { activity: string; email: string }) => {
    return await prisma.userGroups.findFirst({
      where: {
        participants: { some: { email: params.email } },
        Activities: { some: { id: params.activity } },
      },
    });
  }
);

export const getGroups = createServerFn('GET', async (activityId: string) => {
  return await prisma.userGroups.findMany({
    where: { Activities: { some: { id: activityId } } },
  });
});

export const getGroupInfo = createServerFn(
  'GET',
  async (activityId: string) => {
    return await prisma.userGroups.findMany({
      where: { Activities: { some: { id: activityId } } },
      include: { participants: { orderBy: { email: 'asc' } } },
    });
  }
);

export const getGroupUsers = createServerFn('GET', async (group: string) => {
  return await prisma.users.findMany({
    where: { UserGroup: { some: { id: group } } },
  });
});

export const getActivityUsers = createServerFn(
  'GET',
  async (activity: string) => {
    return await prisma.users.findMany({
      where: { modules: { some: { activities: { some: { id: activity } } } } },
    });
  }
);
