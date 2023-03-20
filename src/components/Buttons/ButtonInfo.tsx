import { classNameGenerator } from '@/lib/utils';
import React, { ReactNode } from 'react';
import { ButtonProps, SpanProps } from '../HTML.types';

function ButtonInfo({
  Icon,

  children,
  popOverProps,
  ...props
}: {
  Icon: () => JSX.Element;

  children: ReactNode;
  popOverProps?: SpanProps;
} & ButtonProps) {
  const buttonInfoStyle = {
    button: 'text-whit text-2xl relative group',
    popOverText:
      'opacity-0 absolute mr-3 bg-transparent w-2 h-2  duration-100 group-hover:opacity-100 text-base'
  };
  return (
    <button {...props} className={classNameGenerator(buttonInfoStyle.button, props.className)}>
      <span
        {...popOverProps}
        className={classNameGenerator(buttonInfoStyle.popOverText, popOverProps?.className)}
      >
        {children}
      </span>
      <Icon />
    </button>
  );
}

export default ButtonInfo;
