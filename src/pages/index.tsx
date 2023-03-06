import UserProfileForm from '@/components/UserProfileForm/UserProfileForm';

import PageHead from '@/components/Layout/PageHead/PageHead';

export default function Home() {
  return (
    <>
      <PageHead title="Home" description="Welcome to Jobs agent!" />
      <div className="mt-[10vh] flex min-h-[75vh] flex-col items-center justify-center pr-[3rem] xs:h-full">
        <UserProfileForm />
      </div>
    </>
  );
}
