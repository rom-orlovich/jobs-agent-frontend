import { useAuthContext } from '@/context/UserContext';

import { BoolKey } from '@/lib/types/types';
import { classNameGenerator } from '@/lib/utils';
import { signIn, signOut } from 'next-auth/react';
import React, { MouseEventHandler, PropsWithChildren } from 'react';
import { ButtonProps } from '../HTML.types';

export type ButtonAuth = ButtonProps & PropsWithChildren;
function ButtonAuth(buttonProps: ButtonAuth) {
  const { children, ...restButtonProps } = buttonProps;
  const { isAuthenticated } = useAuthContext();
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
    <button
      {...restButtonProps}
      className={classNameGenerator('button-custom  text-white hover:opacity-75', buttonProps.className)}
      onClick={curButtonOptions.onClick}
    >
      {children}
    </button>
  );
}

export default ButtonAuth;
