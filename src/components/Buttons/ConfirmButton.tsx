import { classNameGenerator } from '@/lib/utils';
import React from 'react';
import { ButtonProps } from '../HTML.types';
function ConfirmButton({ className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={classNameGenerator(
        'button-custom bg-success-primary bg-success-primary-500 text-text-secondary hover:bg-success-primary-400',
        className
      )}
    >
      אשר
    </button>
  );
}

export default ConfirmButton;
