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
  // const outerElementStyle = (`overflow-x-hidden `, outerElementClass);
  const innerElementStyle = innerElementClass;
  const isActive = (className: string) => {
    return `${active ? className : ''}`;
  };
  return (
    <div className={classNameGenerator(isActive('h-[14rem]'), 'overflow-x-hidden', outerElementClass)}>
      <div className={classNameGenerator(isActive('max-h-[40rem] min-h-[15rem]'), innerElementStyle)}>
        {children}
      </div>
    </div>
  );
}

export default Overflow;
