import ButtonAuth from '@/components/Buttons/ButtonAuth';
import Toggle from '@/components/Toggle/Toggle';
import { BoolKey } from '@/lib/types/types';
import { classNameGenerator } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import HamburgerMenu from './HamburgerMenu';
import Profile from './Profile';
import { BiLogOutCircle } from 'react-icons/bi';
import SideNavItem from './SideNavItem';
import { navLinks } from './SidebarLinks';
import { useAuthContext } from '@/context/UserContext';
const sideBarStyle = {
  nav: 'fixed z-50 top-0 flex h-full  flex-col items-center bg-nav-500 shadow-lg',

  isOn: {
    nav: {
      true: 'min-w-[12rem]',
      false: 'min-w-[2rem]'
    }
  },
  'hover-link': 'hover:bg-nav-600',
  margin: 'mb-2',
  'links&button-container': 'flex h-full flex-col justify-between py-4 w-[100%]',
  links: 'mt-2 flex flex-col items-center gap-6 w-full',
  li: 'w-full p-2 rounded-md',
  link: 'text-white w-full',
  icon: 'text-2xl'
};
function Sidebar() {
  const { userProfileData } = useAuthContext();
  return (
    <Toggle>
      {(toggleProps) => {
        const { isON } = toggleProps;
        const bool = String(isON) as BoolKey;
        const navIsOn = sideBarStyle['isOn']['nav'][bool];

        return (
          <section className={classNameGenerator(sideBarStyle.nav, navIsOn, 'duration-500')}>
            <HamburgerMenu {...toggleProps} />
            {toggleProps.isON && <Profile />}
            <div className={sideBarStyle['links&button-container']}>
              <ul className={sideBarStyle.links}>
                {navLinks(sideBarStyle.icon).map((el, i) => {
                  const hash = el.link === '/jobs' ? userProfileData.userQuery.hash : '';
                  return (
                    <li
                      className={classNameGenerator(sideBarStyle.li, sideBarStyle['hover-link'])}
                      key={el.text + i}
                    >
                      <Link className={sideBarStyle.link} href={`${el.link}?hash=${hash}`}>
                        <SideNavItem icon={el.icon} isOn={isON} text={el.text} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <ButtonAuth className={classNameGenerator(sideBarStyle['hover-link'])}>
                <SideNavItem
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
