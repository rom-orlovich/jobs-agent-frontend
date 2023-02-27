import { classNameGenerator } from '@/lib/utils';
import React, { PropsWithChildren } from 'react';
import { MdOutlineDataSaverOff } from 'react-icons/md';
import { ButtonProps } from '../HTML.types';

function SearchButton(props: ButtonProps & PropsWithChildren) {
  return (
    <button
      {...props}
      className={classNameGenerator(
        'button-custom flex items-center justify-between gap-2 bg-search-500 text-xl text-white  hover:bg-search-400 disabled:bg-search-600'
      )}
    >
      {props.children}
      <MdOutlineDataSaverOff />
    </button>
  );
}

export default SearchButton;
