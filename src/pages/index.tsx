import UserDetailsForm from '@/components/UserDetailsForm/UserDetailsForm';

import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import { getServerSession } from 'next-auth';
import { getUserByID } from 'mongoDB/handlers';
import { authOptions } from './api/auth/[...nextauth]';
import { UserOptions } from '@/lib/types/api.types';
import PageHead from '@/components/Layout/PageHead/PageHead';
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const user = await getUserByID(session?.user.id || '');

  const defaultUser = {
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
  const result: UserOptions = user || defaultUser;
  return {
    props: result
  };
};
export default function Home(user: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <PageHead title="Home" description="Welcome to Jobs agent!" />
      <div className="mr-[4vw] mt-[10vh] flex h-full flex-col items-center justify-center">
        <UserDetailsForm user={user} />
      </div>
    </>
  );
}
