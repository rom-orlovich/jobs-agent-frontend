import { classNameGenerator } from '@/lib/utils';

import React, { PropsWithChildren } from 'react';
import { MdTrackChanges } from 'react-icons/md';
import { ButtonProps } from '../HTML.types';
import InfoButton from './InfoButton';
function TrackButton({
  mark,
  ...props
}: ButtonProps & PropsWithChildren & { className?: string; mark: boolean }) {
  const markStyle = {
    true: 'text-status-400 hover:text-status-500',
    false: 'text-error-400 hover:text-error-500'
  };

  const curMarkStyle = markStyle[`${mark}`];
  return (
    <button {...props}>
      <InfoButton
        Icon={() => <MdTrackChanges />}
        // {...props}
        dir={'rtl'}
        className={classNameGenerator(curMarkStyle, props.className)}
      >
        {mark ? 'הסר' : 'עקוב'}
      </InfoButton>
    </button>
  );
}

export default TrackButton;
