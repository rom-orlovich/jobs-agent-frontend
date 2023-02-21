import React, { PropsWithChildren } from 'react';
import { AiOutlineArrowDown, AiOutlineArrowLeft } from 'react-icons/ai';
import Toggle from '../Toggle/Toggle';

interface ToggleTopicProps {
  heading: string;
}
function ToggleTopic({ heading, children }: ToggleTopicProps & PropsWithChildren) {
  return (
    <Toggle>
      {({ handleOnClick, isON }) => {
        return (
          <>
            <div>
              <h1>{heading}</h1>
              <button onClick={handleOnClick}>
                {isON ? <AiOutlineArrowDown /> : <AiOutlineArrowLeft />}
              </button>
            </div>
            {isON && children}
          </>
        );
      }}
    </Toggle>
  );
}

export default ToggleTopic;
