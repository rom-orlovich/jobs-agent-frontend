import UserProfileForm from '@/components/UserProfileForm/UserProfileForm';

import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import { getServerSession } from 'next-auth';
import { getUserByID } from 'mongoDB/handlers';
import { authOptions } from './api/auth/[...nextauth]';

import PageHead from '@/components/Layout/PageHead/PageHead';
import { UserProfileWithOneUserQuery } from '@/lib/types/api.types';
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const user = await getUserByID(session?.user.id || '');

  const defaultUser: UserProfileWithOneUserQuery = {
    userID: session?.user?.id,
    overallEx: 0,
    requirements: {},
    excludedRequirements: {},
    userQuery: {
      distance: '',
      experience: '',
      jobType: '',
      location: '',
      position: '',
      scope: ''
    }
  };
  let result: UserProfileWithOneUserQuery | undefined = undefined;

  //Extract the last user's userQuery from userQueries in order to adjust the userQuery that will fit the UserProfile form.
  if (user) {
    const { userQueries, ...restUserProps } = user;
    const lengthUserQuery = userQueries.length;
    result = {
      ...restUserProps,
      userQuery: {
        ...userQueries[lengthUserQuery - 1],
        createdAt: userQueries[lengthUserQuery - 1].createdAt?.toISOString() as unknown as Date
      }
    };
  }

  //If the user, on exist Initial a new one.
  return {
    props: result || defaultUser
  };
};

export default function Home(user: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <PageHead title="Home" description="Welcome to Jobs agent!" />
      <div className="mr-[4vw] mt-[10vh] flex h-full flex-col items-center justify-center">
        <UserProfileForm user={user} />
      </div>
    </>
  );
}
