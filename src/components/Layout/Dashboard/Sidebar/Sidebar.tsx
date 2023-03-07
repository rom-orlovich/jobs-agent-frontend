import ButtonAuth from '@/components/Buttons/ButtonAuth';
import Toggle from '@/components/Toggle/Toggle';
import { BoolKey } from '@/lib/types/types';
import { classNameGenerator } from '@/lib/utils';

import React from 'react';
import HamburgerMenu from './HamburgerMenu';
import Profile from './Profile';
import { BiLogOutCircle } from 'react-icons/bi';
import SidebarItemContent from './SideNavItem/SidebarItemContent';

import SideLinksItems from './SidebarItems';
const sideBarStyle = {
  nav: 'fixed z-50 top-0 flex h-[100vh] flex-col items-center bg-nav-500 shadow-lg ',
  isOn: {
    nav: {
      true: 'min-w-[14rem]',
      false: 'min-w-[2rem]'
    }
  },
  hoverLink: 'hover:bg-nav-600',
  'links&button-container': 'flex h-full flex-col justify-between py-4 w-[100%]',
  icon: 'text-2xl'
};

function Sidebar() {
  return (
    <Toggle>
      {(toggleProps) => {
        const { isON } = toggleProps;
        const bool = String(isON) as BoolKey;
        const navIsOn = sideBarStyle['isOn']['nav'][bool];

        return (
          <section className={classNameGenerator(sideBarStyle.nav, navIsOn, 'duration-500')}>
            <HamburgerMenu {...toggleProps} />
            {isON && <Profile />}
            <div className={sideBarStyle['links&button-container']}>
              <SideLinksItems isON={isON} />

              <ButtonAuth className={classNameGenerator(sideBarStyle.hoverLink)}>
                <SidebarItemContent
                  icon={<BiLogOutCircle className={sideBarStyle.icon} />}
                  isOn={isON}
                  text={'התנתק'}
                />
              </ButtonAuth>
            </div>
          </section>
        );
      }}
    </Toggle>
  );
}

export default Sidebar;
