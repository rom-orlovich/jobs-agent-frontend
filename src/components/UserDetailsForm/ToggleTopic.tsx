import { classNameGenerator } from '@/lib/utils';
import React, { PropsWithChildren } from 'react';
import { AiOutlineArrowDown, AiOutlineArrowLeft } from 'react-icons/ai';
import { HeadingProps } from '../HTML.types';
import Toggle from '../Toggle/Toggle';

interface ToggleTopicProps {
  headingProps: HeadingProps;
}
function ToggleTopic({ headingProps, children }: ToggleTopicProps & PropsWithChildren) {
  return (
    <Toggle>
      {({ handleOnClick, isON }) => {
        return (
          <div>
            <button className="flex items-center gap-2" onClick={handleOnClick}>
              <div> {isON ? <AiOutlineArrowDown /> : <AiOutlineArrowLeft />}</div>

              <h3 {...headingProps} className={classNameGenerator(headingProps.className)}>
                {headingProps.title}
              </h3>
            </button>

            <div className="mt-2"> {isON && children} </div>
          </div>
        );
      }}
    </Toggle>
  );
}

export default ToggleTopic;
