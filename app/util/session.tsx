// app/services/session.server.ts
import { useSession } from 'vinxi/http';
import type { Users } from '@prisma/client';

type SessionUser = {
  userEmail: Users['email'];
  userType: Users['type'];
};

export function useAppSession() {
  return useSession<SessionUser>({
    password: 'ChangeThisBeforeShippingToProdOrYouWillBeFired',
  });
}
