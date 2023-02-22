import { classNameGenerator } from '@/lib/utils';
import React, { PropsWithChildren } from 'react';

function Overflow({
  children,
  outerElementClass,
  innerElementClass
}: PropsWithChildren & { outerElementClass: string; innerElementClass: string }) {
  return (
    <div className={classNameGenerator('overflow-y-auto overflow-x-hidden', outerElementClass)}>
      <div className={classNameGenerator(innerElementClass)}>{children}</div>
    </div>
  );
}

export default Overflow;
