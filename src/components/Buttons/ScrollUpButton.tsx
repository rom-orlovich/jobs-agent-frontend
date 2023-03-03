import React from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';

function ScrollUpButton() {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        window.scroll({
          top: 0,
          behavior: 'smooth'
        });
      }}
      className="fixed left-3 bottom-3 flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-full bg-nav-500 hover:bg-nav-600"
    >
      <AiOutlineArrowUp className="h-[2rem] w-[2rem]  text-white" />
    </button>
  );
}

export default ScrollUpButton;
