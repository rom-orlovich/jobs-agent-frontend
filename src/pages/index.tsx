import UserProfileForm from '@/components/UserProfileForm/UserProfileForm';

import PageHead from '@/components/Layout/PageHead/PageHead';

import { GetServerSidePropsContext } from 'next';
import { getInitialUserProfile } from '@/lib/getInitialUserProfile';

//Get the initial user profile before the client load.
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return getInitialUserProfile(ctx);
}
export default function Home() {
  return (
    <>
      <PageHead title="Home" description="Welcome to Jobs agent!" />
      <div className="mt-[5vh] flex min-h-[75vh] flex-col items-center justify-center pr-[3rem] xs:h-[90%]">
        <UserProfileForm />
      </div>
    </>
  );
}
