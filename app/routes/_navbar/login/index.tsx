import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useMutation } from '../../../hooks/useMutation';
import { createServerFn, useServerFn } from '@tanstack/start';
import { PrismaClient, UserType } from '@prisma/client';
import { hashPassword } from '../../../util/databaseFunctions';
import { useAppSession } from '../../../util/session';
import { signupFn } from '../signup';
import { Auth } from '../../../components/Auth';

export const Route = createFileRoute('/_navbar/login/')({
  component: LoginComponent,
});

const prisma = new PrismaClient();

export const loginFn = createServerFn(
  'POST',
  async (
    payload: {
      email: string;
      password: string;
      username: string;
      userType: UserType;
    },
    { request }
  ) => {
    // Find the user
    const user = await prisma.users.findUnique({
      where: {
        email: payload.email,
      },
    });

    // Check if the user exists
    if (!user) {
      return {
        error: true,
        userNotFound: true,
        message: 'User not found',
      };
    }

    // Check if the password is correct
    const hashedPassword = await hashPassword(payload.password);

    if (user.password !== hashedPassword) {
      return {
        error: true,
        message: 'Incorrect password',
      };
    }

    // Create a session
    const session = await useAppSession();

    // Store the user's email in the session
    await session.update({
      userEmail: user.email,
    });
  }
);

function LoginComponent() {
  const router = useRouter();

  const loginMutation = useMutation({
    fn: loginFn,
    onSuccess: async (ctx) => {
      if (!ctx.data?.error) {
        await router.invalidate();
        router.navigate({ to: '/' });
        return;
      }
    },
  });

  const signupMutation = useMutation({
    fn: useServerFn(signupFn),
  });
  return (
    <Auth
      actionText="Login"
      status={loginMutation.status}
      onSubmit={(e) => {
        const formData = new FormData(e.target as HTMLFormElement);

        loginMutation.mutate({
          email: formData.get('email') as string,
          password: formData.get('password') as string,
          username: formData.get('username') as string,
          userType: UserType.Student,
        });
      }}
      afterSubmit={
        loginMutation.data ? (
          <>
            <div className="text-red-400">{loginMutation.data.message}</div>
            {loginMutation.data.userNotFound ? (
              <div>
                <button
                  className="text-blue-500"
                  onClick={(e) => {
                    const formData = new FormData(
                      (e.target as HTMLButtonElement).form!
                    );

                    signupMutation.mutate({
                      email: formData.get('email') as string,
                      password: formData.get('password') as string,
                      username: formData.get('username') as string,
                      userType: UserType.Student,
                    });
                  }}
                  type="button"
                >
                  Sign up instead?
                </button>
              </div>
            ) : null}
          </>
        ) : null
      }
    />
  );
}