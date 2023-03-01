import { classNameGenerator } from '@/lib/utils';
// import Link, { LinkProps } from 'next/link';
import React, { PropsWithChildren } from 'react';
import { MdTrackChanges } from 'react-icons/md';
import { ButtonProps } from '../HTML.types';
function TrackButton({
  mark,
  ...props
}: ButtonProps & PropsWithChildren & { className?: string; mark: boolean }) {
  const trackButtonStyle = {
    button: 'text-whit text-2xl relative group',
    text: 'opacity-0 absolute mr-3 bg-transparent w-2 h-2  duration-100 group-hover:opacity-100 text-base'
  };
  const markStyle = {
    true: 'text-status-400 hover:text-status-500',
    false: 'text-error-400 hover:text-error-500'
  };

  const curMarkStyle = markStyle[`${mark}`];

  //flex items-center gap-2
  return (
    <button
      {...props}
      dir={'rtl'}
      className={classNameGenerator(trackButtonStyle.button, curMarkStyle, props.className)}
    >
      <span className={trackButtonStyle.text}> {mark ? 'הסר' : 'עקוב'}</span>
      <MdTrackChanges />
    </button>
  );
}

export default TrackButton;
