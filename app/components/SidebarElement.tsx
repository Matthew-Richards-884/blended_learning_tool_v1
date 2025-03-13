import { PrismaClient } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/start';

const prisma = new PrismaClient();

const getModule = createServerFn('GET', async (code: string) => {
  return await prisma.modules.findFirst({ where: { code: code } });
});

export const SidebarElement = ({ module }: { module: string }) => {
  const moduleData = useQuery({
    queryKey: ['moduleData', module, 'SidebarElement'],
    queryFn: () => getModule(module),
  }).data;

  return (
    <Link
      to={'/modules/$module'}
      params={{ module: module }}
      className="relative mx-2 my-0.5 flex min-h-10 bg-gray-50 py-1 text-black opacity-80 shadow-md hover:opacity-100"
    >
      <div className="flex flex-col">
        <div className="flex w-full">
          <div className="absolute inset-1 h-min w-fit text-[0.5rem]">
            <span className="">{module}</span>&nbsp;
          </div>
        </div>
        <div className="mt-3 flex h-min flex-auto self-end">
          <span className="rounded-md px-1 text-sm">{moduleData?.title}</span>
        </div>
      </div>
    </Link>
  );
};
