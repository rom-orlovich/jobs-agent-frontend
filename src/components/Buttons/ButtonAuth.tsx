import useAuth from '@/hooks/useAuth';
import { BoolKey } from '@/lib/types/types';
import { signIn, signOut } from 'next-auth/react';
import React, { MouseEventHandler } from 'react';

function ButtonAuth() {
  const { isAuthenticated } = useAuth();
  const handleSignOut: MouseEventHandler<HTMLButtonElement> = () => signOut();
  const handleSignIn: MouseEventHandler<HTMLButtonElement> = () => signIn();
  const buttonOptions = {
    true: {
      onClick: handleSignOut,
      text: 'התנתק'
    },
    false: {
      onClick: handleSignIn,
      text: 'התחבר'
    }
  };
  const curButtonOptions = buttonOptions[String(isAuthenticated) as BoolKey];

  return (
    <button className="button-custom  text-white hover:opacity-75" onClick={curButtonOptions.onClick}>
      {curButtonOptions.text}
    </button>
  );
}

export default ButtonAuth;
