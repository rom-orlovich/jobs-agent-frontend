import { ToggleChildrenProps } from '@/components/Toggle/Toggle';
import { classNameGenerator } from '@/lib/utils';
import React from 'react';

function HamburgerMenu(props: ToggleChildrenProps) {
  const hamburgerMenuStyle = {
    line: 'h-0.5 w-6 bg-white duration-100',
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
  const line = hamburgerMenuStyle.line;
  const boolStr = String(props.isON) as 'true' | 'false';
  const menu = hamburgerMenuStyle['x'][boolStr];
  return (
    <div className="mt-4 flex h-8 w-full flex-col items-center justify-center">
      <button onClick={props.handleOnClick} className={`h-4 w-fit `}>
        <div className={classNameGenerator(line, menu.first)} />
        <div className={classNameGenerator(line, menu.sec)} />
        <div className={classNameGenerator(line, menu.third)} />
      </button>
    </div>
  );
}

export default HamburgerMenu;
