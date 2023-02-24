import React from 'react';
import { MdOutlineDataSaverOff } from 'react-icons/md';

function Spinner({ isLoading }: { isLoading: boolean }) {
  return isLoading ? (
    <MdOutlineDataSaverOff className="spin absolute left-[45%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] text-6xl text-cyan-400" />
  ) : (
    <></>
  );
}

export default Spinner;
