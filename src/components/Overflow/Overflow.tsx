import { classNameGenerator } from '@/lib/utils';
import React, { PropsWithChildren } from 'react';

function Overflow({
  children,
  active,
  outerElementClass,
  innerElementClass,
  activeClassInner,
  activeClassOuter
}: PropsWithChildren & {
  outerElementClass: string;
  innerElementClass: string;
  activeClassInner?: string;
  activeClassOuter?: string;
  active: boolean;
}) {
  // const outerElementStyle = (`overflow-x-hidden `, outerElementClass);

  const isActive = (...className: (string | undefined)[]) => {
    return `${active ? classNameGenerator(...className) : ''}`;
  };
  return (
    <div
      className={classNameGenerator(
        outerElementClass,
        isActive('h-[14rem]', activeClassOuter),
        'overflow-x-hidden'
      )}
    >
      <div
        className={classNameGenerator(
          innerElementClass,

          isActive('max-h-[40rem] min-h-[15rem]', activeClassInner)
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default Overflow;
