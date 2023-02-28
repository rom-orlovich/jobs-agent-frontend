import { classNameGenerator } from '@/lib/utils';
import React, { PropsWithChildren } from 'react';
import { FaCloudDownloadAlt } from 'react-icons/fa';
import { ButtonProps } from '../HTML.types';

function DownloadButton(props: ButtonProps & PropsWithChildren) {
  return (
    <button
      //   disabled={downloadState.isMutating}
      {...props}
      className={classNameGenerator(
        'button-custom bg-success-secondary flex items-center justify-between gap-2 bg-success-secondary-500  text-white  hover:bg-success-secondary-400 disabled:bg-success-primary-600',
        props.className
      )}
    >
      {props.children} <FaCloudDownloadAlt />
    </button>
  );
}

export default DownloadButton;
