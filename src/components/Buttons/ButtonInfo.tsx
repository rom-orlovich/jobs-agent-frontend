import { classNameGenerator } from '@/lib/utils';
import React from 'react';
import { ButtonProps, SpanProps } from '../HTML.types';

function ButtonInfo({
  Icon,
  buttonProps,
  popOverText,
  popOverProps
}: {
  Icon: () => JSX.Element;
  buttonProps: ButtonProps;
  popOverText: string;
  popOverProps: SpanProps;
}) {
  const buttonInfoStyle = {
    button: 'text-whit text-2xl relative group',
    popOverText:
      'opacity-0 absolute mr-3 bg-transparent w-2 h-2  duration-100 group-hover:opacity-100 text-base'
  };
  return (
    <button
      {...buttonProps}
      dir={'rtl'}
      className={classNameGenerator(buttonInfoStyle.button, buttonProps.className)}
    >
      <span
        {...popOverProps}
        className={classNameGenerator(buttonInfoStyle.popOverText, popOverProps.className)}
      >
        {popOverText}
      </span>
      <Icon />
    </button>
  );
}

export default ButtonInfo;
