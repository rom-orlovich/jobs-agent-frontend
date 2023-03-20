import { classNameGenerator } from '@/lib/utils';
import React, { PropsWithChildren } from 'react';
import { AiOutlineArrowDown, AiOutlineArrowLeft } from 'react-icons/ai';
import { InfoButtonProps } from '../Buttons/InfoButton';

import { ButtonProps, DivProps, HeadingProps } from '../HTML.types';
import Toggle from '../Toggle/Toggle';
import InfoTopic from './InfoTopic';
interface ToggleTopicProps {
  headingProps?: HeadingProps;
  childrenWrapper?: DivProps;
  as?: () => JSX.Element;
  toggleWrapper?: DivProps;
  buttonProps?: ButtonProps;
  infoTopicProps?: InfoButtonProps;
}
function ToggleTopic({
  headingProps,
  children,
  childrenWrapper,
  as,
  toggleWrapper,
  buttonProps,
  infoTopicProps
}: ToggleTopicProps & PropsWithChildren) {
  return (
    <Toggle>
      {({ handleOnClick, isON }) => {
        return (
          <div {...toggleWrapper}>
            <button
              {...buttonProps}
              onKeyUp={(e) => {
                if (e.code === 'Space') {
                  e.preventDefault();
                }
              }}
              className={classNameGenerator(
                'relative flex w-[95%] items-center gap-2',
                buttonProps?.className
              )}
              onClick={handleOnClick}
            >
              <div> {isON ? <AiOutlineArrowDown /> : <AiOutlineArrowLeft />}</div>

              {!as ? (
                <h3 {...headingProps} className={classNameGenerator(headingProps?.className)}>
                  {headingProps?.title}
                  {infoTopicProps && <InfoTopic {...infoTopicProps} />}
                </h3>
              ) : (
                as()
              )}
            </button>

            <div className={childrenWrapper?.className}> {isON && children} </div>
          </div>
        );
      }}
    </Toggle>
  );
}

export default ToggleTopic;
