import { classNameGenerator } from '@/lib/utils';
import React, { PropsWithChildren } from 'react';
import { MdOutlineDataSaverOff } from 'react-icons/md';
import { ButtonProps } from '../HTML.types';

function LoadButton(props: ButtonProps & PropsWithChildren) {
  return (
    <button
      disabled={props.disabled}
      className={classNameGenerator(
        'button-custom flex items-center justify-between gap-2 bg-loading-500 text-xl text-white hover:bg-loading-400 disabled:bg-loading-600',
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
      <MdOutlineDataSaverOff />
    </button>
  );
}

export default LoadButton;
