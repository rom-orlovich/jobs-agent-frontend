import { classNameGenerator } from '@/lib/utils';
import React from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { CircleButtonProps } from './Button.types';

function CircleAddButton({ className, iconsProps, ...props }: CircleButtonProps) {
  return (
    <button
      className={classNameGenerator('text-adding-primary-500 hover:text-adding-primary-400', className)}
      {...props}
    >
      <AiFillPlusCircle className={classNameGenerator('h-[1.5rem] w-[1.5rem]', iconsProps?.className)} />
    </button>
  );
}

export default CircleAddButton;
