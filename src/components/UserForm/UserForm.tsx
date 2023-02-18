import React from 'react';
import Profile from '../Profile/Profile';
import UserQuery from '../UserQuery/UserQuery';
import useUserForm from './useUserForm/useUserForm';
const formStyle = {
  form: 'w-[20rem]'
};

function UserForm() {
  const userForm = useUserForm();
  return (
    <form className={formStyle.form}>
      <Profile {...userForm} />
      <UserQuery />
    </form>
  );
}

export default UserForm;
