import { classNameGenerator } from '@/lib/utils';
import React, { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { ButtonProps, SpanProps } from '../HTML.types';

export interface InfoButtonProps extends ButtonProps {
  Icon?: IconType;

  children?: ReactNode;
  popOverProps?: SpanProps;
}

function InfoButton({ Icon, children, popOverProps, ...props }: InfoButtonProps) {
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
      {Icon && <Icon />}
    </button>
  );
}

export default InfoButton;
