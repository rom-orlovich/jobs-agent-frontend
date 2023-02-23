import Toggle from '@/components/Toggle/Toggle';
import { BoolKey } from '@/lib/types/types';
import { classNameGenerator } from '@/lib/utils';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import HamburgerMenu from '../../Navabar/HamburgerMenu/HamburgerMenu';
import Profile from './Profile/Profile';

const sideBarStyle = {
  nav: 'fixed top-0 flex h-full  flex-col items-center bg-nav-500 shadow-lg',

  isOn: {
    nav: {
      true: 'min-w-[14rem]',
      false: 'min-w-[4rem]'
    }
  },
  margin: 'mb-2',
  links: 'mt-2 flex flex-col items-center gap-8',
  link: ''
};
interface NavLinkProps {
  link: string;
  isMargin?: boolean;
  text: string;
  icon?: ReactNode;
}

const navLinks: NavLinkProps[] = [
  {
    link: '/',
    text: 'חיפוש'
  },
  {
    link: '/',
    text: 'חיפוש'
  },
  {
    link: '/',
    text: 'חיפוש'
  },
  {
    link: '/',
    text: 'חיפוש'
  }
];

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
            {toggleProps.isON && <Profile />}
            <ul className={sideBarStyle.links}>
              {navLinks.map((el, i) => {
                return (
                  <li key={el.text + i}>
                    <Link href={el.link}>{el.text}</Link>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      }}
    </Toggle>
  );
}

export default Sidebar;
