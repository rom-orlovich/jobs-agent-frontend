import { GetServerSidePropsContext } from 'next';
import { getUserByID } from 'mongoDB/lib/users';
import { UserProfile } from './types/user.types';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export const getInitialUserProfile = async ({ req, res }: GetServerSidePropsContext) => {
  const data = await getServerSession(req, res, authOptions);

  if (!data?.user.id)
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  console.log(data?.user.id);

  const userProfile = await getUserByID(data?.user.id);

  const serializeUserProfile: UserProfile = JSON.parse(JSON.stringify(userProfile));
  return {
    props: {
      data: serializeUserProfile
    }
  };
};

export type ReturnTypeGetInitialUserProfile = { data: UserProfile };
