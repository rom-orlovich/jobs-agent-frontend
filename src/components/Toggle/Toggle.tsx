import React, { MouseEventHandler, useState } from 'react';

interface ToggleChildrenProps {
  handleOnClick: MouseEventHandler<HTMLButtonElement>;
  toggleState: boolean;
}
interface ToggleProps {
  children: (props: ToggleChildrenProps) => void;
}

/**
 * This component enable to reuse the state of on/off to the children component.
 */
function Toggle({ children }: ToggleProps) {
  const [toggleState, setToggleState] = useState(false);

  // Handle the onClick event in order to change the state of the toggle.
  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setToggleState((pre) => !pre);
  };
  return (
    <>
      {children({
        handleOnClick,
        toggleState
      })}
    </>
  );
}

export default Toggle;
