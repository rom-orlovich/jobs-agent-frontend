import { classNameGenerator } from '@/lib/utils';
import React from 'react';
import { ButtonProps } from '../HTML.types';
function ConfirmButton({ className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={classNameGenerator('rounded-lg bg-blue-500 p-1 px-4 text-cyan-50', className)}
      // onClick={(e) => {
      //   e.preventDefault();
      //   handleRequirements(values);
      // }}
    >
      אשר
    </button>
  );
}

export default ConfirmButton;
