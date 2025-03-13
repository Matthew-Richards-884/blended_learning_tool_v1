import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { getAppSession } from '../../../components/Navbar';

export const Route = createFileRoute('/_navbar/_authed/options')({
  component: OptionComponent,
});

function OptionComponent() {
  const session = useQuery({
    queryKey: ['session'],
    queryFn: () => getAppSession(),
  }).data;


  return <div></div>;
}
