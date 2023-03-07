import { classNameGenerator } from '@/lib/utils';
import Link from 'next/link';
import React, { MouseEventHandler } from 'react';
import { NavLinkProps } from '../lib/links';
import SidebarItemContent from './SidebarItemContent';

function SidebarItem({
  isON,
  isActiveLink,
  isMutate,
  onClickMutate,
  ...linkProps
}: {
  isON: boolean;
  isActiveLink: boolean;
  isMutate?: boolean;
  onClickMutate: MouseEventHandler;
} & NavLinkProps) {
  const activeStyle = isActiveLink ? 'bg-nav-600' : '';

  //Default item style.
  const itemStyle = {
    li: classNameGenerator(`hover:bg-nav-600 w-full p-2 rounded-md cursor-pointer`, activeStyle),
    link: `text-white w-full`
  };

  //Mutate item's props.
  const itemIsMutateProps = {
    true: {
      onClick: onClickMutate,
      li: classNameGenerator(itemStyle.li, 'bg-nav-600'),
      link: classNameGenerator(itemStyle.link, 'pointer-events-none')
    },
    false: {
      onClick: undefined,
      li: itemStyle.li,
      link: itemStyle.link
    }
  };

  const curItemProps = itemIsMutateProps[`${!!isMutate}`];

  return (
    <li onClick={curItemProps.onClick} className={curItemProps.li}>
      <Link className={curItemProps.link} href={`${linkProps.link}`}>
        <SidebarItemContent icon={linkProps.icon} isOn={isON} text={linkProps.text} />
      </Link>
    </li>
  );
}

export default SidebarItem;
