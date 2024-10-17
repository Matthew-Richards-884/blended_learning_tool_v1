import { PrismaClient } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

import { createServerFn } from '@tanstack/start';

const prisma = new PrismaClient();

export const getActivities = createServerFn('GET', async () => {
  return await prisma.activities.findMany({
    orderBy: { deadline: 'asc' },
  });
});

export const getActivity = createServerFn('GET', async (id: number) => {
  return await prisma.activities.findFirst({
    where: {
      id: id,
    },
  });
});

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
