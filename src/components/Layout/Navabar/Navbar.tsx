import { GenericRecord } from '@/lib/types/types';
import { signOut, signIn } from 'next-auth/react';
import React, { MouseEventHandler } from 'react';

function Navbar({ isAuthenticated }: { isAuthenticated: boolean }) {
  const handleSignOut: MouseEventHandler<HTMLButtonElement> = () => signOut();
  const handleSignIn: MouseEventHandler<HTMLButtonElement> = () => signIn();
  const buttonOptions: GenericRecord<{ onClick: MouseEventHandler<HTMLButtonElement>; text: string }> = {
    true: {
      onClick: handleSignOut,
      text: 'התנתק'
    },
    false: {
      onClick: handleSignIn,
      text: 'התחבר'
    }
  };
  const curButtonOptions = buttonOptions[`${isAuthenticated}`];

  const button = (
    <button
      className="button-custom  text-text-secondary hover:opacity-75"
      onClick={curButtonOptions.onClick}
    >
      {curButtonOptions.text}
    </button>
  );

  return (
    <nav className="flex h-[4rem] items-center justify-start bg-slate-500">
      <div> {button} </div>
    </nav>
  );
}

export default Navbar;
