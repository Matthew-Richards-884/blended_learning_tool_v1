import { PrismaClient } from '@prisma/client';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { createServerFn, useServerFn } from '@tanstack/start';
import { hashPassword } from '../../../util/hashPassword';
import { useAppSession } from '../../../util/session';
import { useMutation } from '../../../hooks/useMutation';
import { Auth } from '../../../components/Auth';
import { UserType } from '../../../../prisma/types';

export const Route = createFileRoute('/_navbar/signup/')({
  component: SignupComponent,
});

const prisma = new PrismaClient();

// Copied from the tanstack docs
export const signupFn = createServerFn(
  'POST',
  async (payload: {
    email: string;
    password: string;
    username: string;
    userType: UserType;
    redirectUrl?: string;
  }) => {
    // Check if the user already exists
    const found = await prisma.users.findUnique({
      where: {
        email: payload.email,
      },
    });

    // Encrypt the password using Sha256 into plaintext
    const password = await hashPassword(payload.password);
    const username = payload.username;
    const userType = payload.userType;

    // Create a session
    const session = await useAppSession();

    if (found) {
      if (found.password !== password) {
        return {
          error: true,
          userExists: true,
          message: 'User already exists',
        };
      }

      // Store the user's email in the session
      await session.update({
        userEmail: found.email,
      });

      // Redirect to the prev page stored in the "redirect" search param
      throw redirect({
        to: payload.redirectUrl || '/',
      });
    }

    // Create the user
    const user = await prisma.users.create({
      data: {
        email: payload.email,
        username,
        password,
        type: userType,
      },
    });

    // Store the user's email in the session
    await session.update({
      userEmail: user.email,
    });

    // Redirect to the prev page stored in the "redirect" search param
    throw redirect({
      to: payload.redirectUrl || '/',
    });
  }
);

function SignupComponent() {
  const signupMutation = useMutation({
    fn: useServerFn(signupFn),
  });

  return (
    <Auth
      actionText="Sign Up"
      status={signupMutation.status}
      onSubmit={(e) => {
        const formData = new FormData(e.target as HTMLFormElement);

        signupMutation.mutate({
          email: formData.get('email') as string,
          password: formData.get('password') as string,
          username: formData.get('username') as string,
          userType: "Student",
        });
      }}
      afterSubmit={
        signupMutation.data?.error ? (
          <>
            <div className="text-red-400">{signupMutation.data.message}</div>
          </>
        ) : null
      }
    />
  );
}
