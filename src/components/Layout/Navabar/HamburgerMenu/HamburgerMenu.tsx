import React, { useState } from 'react';

function HamburgerMenu() {
  const [state, setState] = useState(false);

  const hamburgerMenuStyle = {
    x: {
      true: {
        first: 'translate-y-[2px] rotate-[45deg]',
        sec: 'rotate-[-45deg]',
        third: 'hidden'
      },
      false: {
        first: 'translate-y-[-8px] rotate-[0deg] ',
        sec: 'rotate-[0deg] ',
        third: 'translate-y-[8px] rotate-[0deg]'
      }
    }
  };
  const boolStr = String(state) as 'true' | 'false';
  const menu = hamburgerMenuStyle['x'][boolStr];
  return (
    <div className="mt-4 flex h-8 w-full flex-col items-center justify-center">
      <button
        onClick={() => {
          setState((pre) => !pre);
        }}
        className={` ${state ? '' : ''} h-4 w-fit `}
      >
        <div className={`h-0.5 w-6 bg-white duration-100 ${menu.first}`} />
        <div className={`h-0.5 w-6 bg-white duration-100 ${menu.sec}`} />
        <div className={`h-0.5 w-6 bg-white duration-100 ${menu.third}`} />
      </button>
    </div>
  );
}

export default HamburgerMenu;
