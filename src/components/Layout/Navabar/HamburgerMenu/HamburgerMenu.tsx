import React, { useState } from 'react';

function HamburgerMenu() {
  const [state, setState] = useState(false);
  return (
    <button
      onClick={() => {
        setState((pre) => !pre);
      }}
      className={`relative ${state ? 'hamburger-menu-close' : ''} space-y-2`}
    >
      <div className="first h-0.5 w-8 bg-text-secondary"></div>
      <div className=" third h-0.5 w-8  bg-text-secondary"></div>
      <div className="sec h-0.5 w-8  bg-text-secondary"></div>
    </button>
  );
}

export default HamburgerMenu;
