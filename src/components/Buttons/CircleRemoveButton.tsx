import { classNameGenerator } from '@/lib/utils';
import React from 'react';

import { IoMdRemoveCircle } from 'react-icons/io';
import { CircleButtonProps } from './Button.types';

function CircleRemoveButton({ className, iconsProps, ...props }: CircleButtonProps) {
  return (
    <button
      {...props}
      className={classNameGenerator(
        'absolute left-0 top-[50%]  text-error-primary-500 hover:text-error-primary-400',
        className
      )}
    >
      <IoMdRemoveCircle className={classNameGenerator('h-[1.5rem] w-[1.5rem]', iconsProps?.className)} />
    </button>
  );
}

export default CircleRemoveButton;
