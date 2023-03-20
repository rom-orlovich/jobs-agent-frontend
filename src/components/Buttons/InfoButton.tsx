import { classNameGenerator } from '@/lib/utils';
import React, { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { SpanProps } from '../HTML.types';

export interface InfoButtonProps extends SpanProps {
  Icon?: IconType;

  children?: ReactNode;
  popOverProps?: SpanProps;
}

function InfoButton({ Icon, children, popOverProps, ...props }: InfoButtonProps) {
  const buttonInfoStyle = {
    infoContainer: 'text-2xl relative group cursor-pointer',
    popOverText:
      'opacity-0 absolute mr-3 bg-transparent w-2 h-2  duration-100 group-hover:opacity-100 text-base'
  };
  return (
    <span {...props} className={classNameGenerator(buttonInfoStyle.infoContainer, props.className)}>
      <span
        {...popOverProps}
        className={classNameGenerator(buttonInfoStyle.popOverText, popOverProps?.className)}
      >
        {children}
      </span>
      {Icon && <Icon />}
    </span>
  );
}

export default InfoButton;
