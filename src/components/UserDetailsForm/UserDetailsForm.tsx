import React from 'react';
import Profile from './Profile/Profile';
import UserQuery from './UserQuery/UserQuery';

import useUserDetailsForm from '../../hooks/useUserDetailsForm/useUserDetailsForm';
import { UserOptions } from '@/lib/types/api.types';
const formStyle = {
  form: 'w-[20rem]'
};

function UserDetailsForm({ user }: { user: UserOptions }) {
  const userForm = useUserDetailsForm(user);
  return (
    <form onSubmit={userForm.handleUserDetailsFormSubmit} className={formStyle.form}>
      <Profile {...userForm} />

      <UserQuery {...userForm} />

      <button type="submit">אשר</button>
      <p>{userForm.formState.data?.message}</p>
    </form>
  );
}

export default UserDetailsForm;
