import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import '../styles/main.css';


export const Route = createFileRoute('/_navbar/_authed')({
  beforeLoad: ({ context }: { context: any }) => {
    console.log('CONTEXT', context);
    if (!context.user) {
      throw new Error('Not authenticated');
    }
  },
  errorComponent: ({ error }) => {
    if (error.message === 'Not authenticated') {
      const router = useRouter();
      router.navigate({
        to: '/login',
      });
      // return (
      //   <div className="w-screen p-5">
      //     <div>You are not authenticated</div>

      //     <Link
      //       to="/login"
      //       activeProps={{
      //         className: 'text-sky-400',
      //       }}
      //       className="items-center justify-center p-3 font-bold hover:text-sky-400"
      //     >
      //       Log In
      //     </Link>
      //   </div>
      // );
    }

    throw error;
  },
});
