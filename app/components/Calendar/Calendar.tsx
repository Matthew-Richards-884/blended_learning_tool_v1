import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAppSession } from '../Navbar';

export const Calendar = () => {
  const queryClient = useQueryClient();
  const session = useQuery({
    queryKey: ['session'],
    queryFn: () => getAppSession(),
  }).data;

  return <div className="flex h-full w-full bg-gray-200">Hello World</div>;
};
