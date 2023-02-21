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
            <button className="flex items-center gap-2" onClick={handleOnClick}>
              <div> {isON ? <AiOutlineArrowDown /> : <AiOutlineArrowLeft />}</div>

              <h1 className="text-2xl font-normal">{heading}</h1>
            </button>

            {isON && children}
          </>
        );
      }}
    </Toggle>
  );
}

export default ToggleTopic;
