import { classNameGenerator } from '@/lib/utils';
import React, { PropsWithChildren } from 'react';
import { MdInsights } from 'react-icons/md';
import { ButtonProps } from '../HTML.types';

function StatusButton(props: ButtonProps & PropsWithChildren) {
  return (
    <button
      {...props}
      dir={'rtl'}
      className={classNameGenerator(
        'button-custom flex items-center gap-2 bg-status-400 text-lg text-white hover:bg-status-500',
        props.className
      )}
    >
      {props.children} <MdInsights />
    </button>
  );
}

export default StatusButton;
