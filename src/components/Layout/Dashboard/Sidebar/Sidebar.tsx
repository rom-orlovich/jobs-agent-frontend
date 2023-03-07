import ButtonAuth from '@/components/Buttons/ButtonAuth';
import Toggle from '@/components/Toggle/Toggle';
import { BoolKey } from '@/lib/types/types';
import { classIsOn, classNameGenerator, createURL, getResMessage } from '@/lib/utils';
import Link from 'next/link';
import React, { MouseEvent } from 'react';
import HamburgerMenu from './HamburgerMenu';
import Profile from './Profile';
import { BiLogOutCircle } from 'react-icons/bi';
import SideNavItemContent from './SideNavItem/SideNavItemContent';
import { LINKS } from './lib/links';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { useScannerContext } from '@/context/ScannerContext';
import { toast } from 'react-toastify';
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
  li: 'w-full p-2 rounded-md cursor-pointer',
  link: 'text-white w-full',
  icon: 'text-2xl',
  active: 'bg-nav-600 '
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

        //For disabling the links that relate to the scanner state mutation.
        const mutatedProps = {
          onClick: (e: MouseEvent) => {
            if (scanner.isMutating) {
              e.preventDefault();
              toast(getResMessage('SEARCH_IS_IN_PROCESS').message);
            }
          },
          className: classNameGenerator(classIsOn(scanner.isMutating, sideBarStyle.active)),
          linkStyle: classIsOn(scanner.isMutating, 'pointer-events-none')
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
                  const liMutateProps =
                    i === 1 || i === 2
                      ? mutatedProps
                      : {
                          className: '',
                          linkStyle: ''
                        };

                  const isActiveLink = router.pathname === el.link;
                  const activeStyle = isActiveLink ? sideBarStyle.active : '';

                  return (
                    <li
                      {...liMutateProps}
                      className={classNameGenerator(
                        sideBarStyle.li,
                        sideBarStyle.hoverLink,
                        liMutateProps.className,
                        activeStyle
                      )}
                      key={el.text + i}
                    >
                      <Link
                        className={classNameGenerator(sideBarStyle.link, liMutateProps.linkStyle)}
                        href={`${el.link}`}
                      >
                        <SideNavItemContent icon={el.icon} isOn={isON} text={el.text} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <ButtonAuth className={classNameGenerator(sideBarStyle.hoverLink)}>
                <SideNavItemContent
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
