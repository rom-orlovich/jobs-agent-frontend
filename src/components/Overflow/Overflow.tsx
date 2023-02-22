import { classNameGenerator } from '@/lib/utils';
import React, { PropsWithChildren } from 'react';

function Overflow({
  children,
  active,
  outerElementClass,
  innerElementClass
}: PropsWithChildren & {
  outerElementClass: string;
  innerElementClass: string;
  active: boolean;
}) {
  const outerElementStyle = classNameGenerator(`overflow-x-hidden `, outerElementClass);
  const innerElementStyle = classNameGenerator(innerElementClass);
  const isActive = (className: string) => {
    return `${active ? className : ''}`;
  };
  return (
    <div className={isActive(outerElementStyle)}>
      <div className={isActive(innerElementStyle)}>{children}</div>
    </div>
  );
}

export default Overflow;
