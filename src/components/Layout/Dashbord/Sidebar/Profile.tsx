import { capitalFirstLetter } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

const profileStyle = {
  container: 'flex flex-col w-full h-8 my-12 justify-center items-center gap-2',
  image: '',
  email: ''
};
function Profile() {
  const { data } = useSession();
  const user = data?.user;
  console.log(user);
  return (
    <div className={profileStyle.container}>
      <Image alt="User Image" src={user?.image || ''} width={40} height={40} />

      <h2 className="flex flex-col items-center gap-2 text-white">
        <span> ברוך הבא, </span>
        {<span>{capitalFirstLetter(user?.name)}</span>}
      </h2>
    </div>
  );
}

export default Profile;
