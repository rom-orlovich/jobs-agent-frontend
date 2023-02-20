import { UserOptions } from '@/lib/user';
import React from 'react';
import Profile from './Profile/Profile';
import UserQuery from './UserQuery/UserQuery';

import useUserForm from './useUserForm/useUserForm';
const formStyle = {
  form: 'w-[20rem]'
};

function UserForm({ user }: { user: UserOptions }) {
  const userForm = useUserForm(user);
  return (
    <form onSubmit={userForm.handleUserFormSubmit} className={formStyle.form}>
      <Profile {...userForm} />
      <UserQuery {...userForm} />

      <button type="submit">אשר</button>
      <p>{userForm.formState.data?.message}</p>
    </form>
  );
}

export default UserForm;
