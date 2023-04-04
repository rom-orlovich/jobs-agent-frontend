import { classNameGenerator } from '@/lib/utils';
import React from 'react';
import { MdOutlineDataSaverOff } from 'react-icons/md';

function Spinner({ isLoading, className }: { isLoading?: boolean; className?: string }) {
  return isLoading ? (
    <MdOutlineDataSaverOff
      className={classNameGenerator(
        'spin fixed left-[45%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] text-6xl text-cyan-400',
        className
      )}
    />
  ) : (
    <></>
  );
}

export default Spinner;
