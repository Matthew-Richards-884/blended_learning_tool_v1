import { Link } from '@tanstack/react-router';
import { Quizzes } from '@prisma/client';

export const QuizCard = ({
  quizInfo,
  moduleCode,
  activity,
}: {
  moduleCode: string;
  activity: string;
  quizInfo: Quizzes & {
    _count: {
      questions: number;
    };
  };
}) => {
  console.log('Info: ', quizInfo);
  return (
    <Link
      to="/modules/$module/activity/$id/quiz/$quiz/edit"
      params={{ module: moduleCode, id: activity, quiz: quizInfo.id }}
      className="relative flex rounded-md bg-slate-400 p-1 text-black"
    >
      <div className="flex flex-col">
        <div className="">{quizInfo.title}</div>
        <div className="">{quizInfo.description}</div>
        <div className="">Questions: {quizInfo._count.questions}</div>
      </div>
    </Link>
  );
};
