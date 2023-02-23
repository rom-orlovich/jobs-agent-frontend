import { capitalFirstLetter } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

const profileStyle = {
  container: 'flex flex-col w-full h-8 mt-[5rem] mb-[4rem] justify-center items-center gap-2',
  image: 'rounded-[100%]',
  username: 'flex flex-col items-center gap-1 text-white text-lg'
};
function Profile() {
  const { data } = useSession();
  const user = data?.user;

  return (
    <div className={profileStyle.container}>
      <Image
        className={profileStyle.image}
        alt="User Image"
        src={user?.image || ''}
        width={65}
        height={65}
      />

      <h2 className={profileStyle.username}>
        <span> ברוך הבא, </span>
        {<span>{capitalFirstLetter(user?.name)}</span>}
      </h2>
    </div>
  );
}

export default Profile;
