import ButtonAuth from '@/components/Buttons/ButtonAuth';
import Toggle from '@/components/Toggle/Toggle';
import { BoolKey } from '@/lib/types/types';
import { classIsOn, classNameGenerator, createURL, getResMessage } from '@/lib/utils';

import React, { MouseEvent } from 'react';
import HamburgerMenu from './HamburgerMenu';
import Profile from './Profile';
import { BiLogOutCircle } from 'react-icons/bi';
import SidebarItemContent from './SideNavItem/SidebarItemContent';
import { LINKS } from './lib/links';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { useScannerContext } from '@/context/ScannerContext';
import { toast } from 'react-toastify';
import SidebarItem from './SideNavItem/SidebarItem';
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
  links: 'mt-2 flex flex-col items-center gap-4 w-full',
  linksOffMode: 'h-[70%]  gap-8 justify-center',
  icon: 'text-2xl'
};

function Sidebar() {
  const { userProfileData } = useAuthContext();
  const { scanner } = useScannerContext();
  const router = useRouter();
  const hash = userProfileData.activeHash;

  return (
    <Toggle>
      {(toggleProps) => {
        const { isON } = toggleProps;
        const bool = String(isON) as BoolKey;
        const navIsOn = sideBarStyle['isOn']['nav'][bool];
        const LINKSEl = LINKS(sideBarStyle.icon);

        const sharedQueriesParams = {
          hash: hash,
          page: 1
        };
        //Set jobs page's and jobs matches page's link to be with user's current active hash
        LINKSEl[1].link = createURL([LINKSEl[1].link], sharedQueriesParams);
        LINKSEl[2].link = createURL([LINKSEl[2].link], {
          ...sharedQueriesParams,
          reason: 'match'
        });

        const disableByMutateHandler = (e: MouseEvent) => {
          if (scanner.isMutating) {
            e.preventDefault();
            toast(getResMessage('SEARCH_IS_IN_PROCESS').message);
          }
        };

        return (
          <section className={classNameGenerator(sideBarStyle.nav, navIsOn, 'duration-500')}>
            <HamburgerMenu {...toggleProps} />
            {isON && <Profile />}
            <div className={sideBarStyle['links&button-container']}>
              <ul
                className={classNameGenerator(
                  sideBarStyle.links,
                  classIsOn(!isON, sideBarStyle.linksOffMode)
                )}
              >
                {LINKSEl.map((el, i) => {
                  return (
                    <SidebarItem
                      isMutate={(i === 1 || i === 2) && scanner.isMutating}
                      isON={isON}
                      onClickMutate={disableByMutateHandler}
                      isActiveLink={router.pathname === el.link}
                      key={el.link + i}
                      {...el}
                    />
                  );
                })}
              </ul>
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
