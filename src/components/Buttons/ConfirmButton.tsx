import { classNameGenerator } from '@/lib/utils';
import React, { PropsWithChildren } from 'react';
import { ButtonProps } from '../HTML.types';
function ConfirmButton({ className, children, ...props }: ButtonProps & PropsWithChildren) {
  return (
    <button
      {...props}
      className={classNameGenerator(
        'button-custom bg-success-primary flex items-center gap-1 bg-success-primary-500 text-lg text-text-secondary hover:bg-success-primary-400',
        className
      )}
    >
      {children || 'שמור'}
    </button>
  );
}

export default ConfirmButton;
