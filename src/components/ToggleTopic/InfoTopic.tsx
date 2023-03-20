import { classIsOn, classNameGenerator } from '@/lib/utils';
import React, { useState } from 'react';
import { BsInfoCircleFill } from 'react-icons/bs';
import InfoButton, { InfoButtonProps } from '../Buttons/InfoButton';
const infoTopicStyle = {
  icon: 'mr-2 text-lg text-orange-400 hover:text-orange-500 z-index-100',
  popover:
    'card shadow-xl min-w-[16rem] w-fit h-fit min-h-[8rem] p-2 bg-slate-50 z-50 l-0 top-[100%] left-[50%] xs:translate-x-[-52%] translate-x-[-52%] hidden group-hover:flex items-center justify-center'
};

function InfoTopic(infoTopicProps: InfoButtonProps) {
  const [state, setState] = useState(false);
  return (
    <InfoButton
      {...infoTopicProps}
      onClick={(e) => {
        e.preventDefault();
        setState((pre) => !pre);
      }}
      className={'!static'}
      popOverProps={{
        ...infoTopicProps.popOverProps,
        className: classNameGenerator(
          infoTopicStyle.popover,
          infoTopicProps.popOverProps?.className,
          classIsOn(state, 'flex opacity-[100%]')
        )
      }}
      Icon={() => <BsInfoCircleFill className={infoTopicStyle.icon} />}
    >
      {infoTopicProps.children}
    </InfoButton>
  );
}

export default InfoTopic;
