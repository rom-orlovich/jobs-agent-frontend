import { classNameGenerator } from '@/lib/utils';
import Link, { LinkProps } from 'next/link';
import React, { PropsWithChildren } from 'react';
import { MdInsights } from 'react-icons/md';
function TrackButton(props: LinkProps & PropsWithChildren & { className?: string }) {
  return (
    <Link
      {...props}
      dir={'rtl'}
      className={classNameGenerator(
        'button-custom flex items-center gap-2 bg-status-400 text-lg text-white hover:bg-status-500',
        props.className
      )}
    >
      {props.children} <MdInsights />
    </Link>
  );
}

export default TrackButton;
