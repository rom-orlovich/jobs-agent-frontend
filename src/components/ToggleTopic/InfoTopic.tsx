import { classNameGenerator } from '@/lib/utils';
import React from 'react';
import { BsInfoCircleFill } from 'react-icons/bs';
import InfoButton, { InfoButtonProps } from '../Buttons/InfoButton';
const infoTopicStyle = {
  icon: 'mr-2 text-sm text-orange-400 hover:text-orange-500',
  popover:
    'card shadow-xl min-w-[15rem] w-fit h-fit min-h-[8rem] p-2 bg-white z-50 l-0 top-[90%] left-[50%] translate-x-[-55%] hidden group-hover:flex items-center justify-center'
};
function InfoTopic(infoTopicProps: InfoButtonProps) {
  return (
    <InfoButton
      {...infoTopicProps}
      className={'!static'}
      popOverProps={{
        ...infoTopicProps.popOverProps,
        className: classNameGenerator(infoTopicStyle.popover, infoTopicProps.popOverProps?.className)
      }}
      Icon={() => <BsInfoCircleFill className={infoTopicStyle.icon} />}
    >
      {infoTopicProps.children}
    </InfoButton>
  );
}

export default InfoTopic;
