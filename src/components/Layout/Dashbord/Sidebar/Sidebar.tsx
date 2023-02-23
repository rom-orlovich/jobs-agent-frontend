import Toggle from '@/components/Toggle/Toggle';
import { BoolKey } from '@/lib/types/types';
import { classNameGenerator } from '@/lib/utils';
import React from 'react';
import HamburgerMenu from '../../Navabar/HamburgerMenu/HamburgerMenu';

const sideBarStyle = {
  nav: 'fixed top-0 flex h-full  flex-col items-center divide-y-2 bg-nav-500 shadow-lg duration-100',

  isOn: {
    nav: {
      true: 'min-w-[10rem]',
      false: 'min-w-[4rem]'
    }
  }
};

function Sidebar() {
  return (
    <Toggle>
      {(toggleProps) => {
        const { isON } = toggleProps;
        const bool = String(isON) as BoolKey;
        const navIsOn = sideBarStyle['isOn']['nav'][bool];

        return (
          <section className={classNameGenerator(sideBarStyle.nav, navIsOn)}>
            <HamburgerMenu {...toggleProps} />
          </section>
        );
      }}
    </Toggle>
  );
}

export default Sidebar;
