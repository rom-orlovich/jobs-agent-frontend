import useAuth from '@/hooks/useAuth';
import { BoolKey } from '@/lib/types/types';
import { classNameGenerator } from '@/lib/utils';
import { signIn, signOut } from 'next-auth/react';
import React, { MouseEventHandler, ReactNode } from 'react';
import { ButtonProps } from '../HTML.types';

function ButtonAuth(buttonProps: ButtonProps & { icon?: ReactNode; isOn?: boolean }) {
  const { icon, isOn } = buttonProps;
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

  const isOnButtonContent = (
    <div className="flex items-center gap-1">
      {icon && icon}
      {curButtonOptions.text}
    </div>
  );
  const isOffButtonContent = icon ? (
    <div className="group relative">
      {icon}
      <span className="absolute top-0 hidden translate-x-[0px] rounded-md bg-white px-2 text-lg text-black shadow-lg duration-100 group-hover:block group-hover:translate-x-[-50px] group-hover:transition">
        {curButtonOptions.text}
      </span>
    </div>
  ) : (
    curButtonOptions.text
  );

  const curButtonContent = isOn ? isOnButtonContent : isOffButtonContent;
  return (
    <button
      {...buttonProps}
      className={classNameGenerator('button-custom  text-white hover:opacity-75', buttonProps.className)}
      onClick={curButtonOptions.onClick}
    >
      {curButtonContent}
    </button>
  );
}

export default ButtonAuth;
