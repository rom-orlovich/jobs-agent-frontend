import { classNameGenerator } from '@/lib/utils';
import React, { PropsWithChildren } from 'react';
import { AiOutlineArrowDown, AiOutlineArrowLeft } from 'react-icons/ai';
import { ButtonProps, DivProps, HeadingProps } from '../HTML.types';
import Toggle from '../Toggle/Toggle';

interface ToggleTopicProps {
  headingProps?: HeadingProps;
  childrenWrapper?: DivProps;
  as?: () => JSX.Element;
  toggleWrapper?: DivProps;
  buttonProps?: ButtonProps;
}
function ToggleTopic({
  headingProps,
  children,
  childrenWrapper,
  as,
  toggleWrapper,
  buttonProps
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
              className={classNameGenerator('flex items-center gap-2', buttonProps?.className)}
              onClick={handleOnClick}
            >
              <div> {isON ? <AiOutlineArrowDown /> : <AiOutlineArrowLeft />}</div>

              {!as ? (
                <h3 {...headingProps} className={classNameGenerator(headingProps?.className)}>
                  {headingProps?.title}
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
