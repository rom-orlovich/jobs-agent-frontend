import React, { ReactNode } from 'react';

export interface SideNavItemProps {
  icon: ReactNode;
  text: string;
  isOn: boolean;
}

const sideNavItemStyle = {
  isOnContent: 'group flex justify-start gap-3 w-full',
  isOffContentContainer: 'group relative flex justify-center',
  isOffContentItem:
    'absolute top-[-2px] hidden translate-x-[0px] rounded-md bg-white px-1 text-lg text-black shadow-lg duration-100 group-hover:block group-hover:translate-x-[-63px] group-hover:transition'
};
/**
 * SideNavItem component create hover effect when the sidebar is close and regular display when its on.
 */
function SideNavItem({ icon, text, isOn }: SideNavItemProps) {
  const isOnContent = (
    <div className={sideNavItemStyle.isOnContent}>
      {icon && icon}
      {text}
    </div>
  );
  const isOffContent = icon ? (
    <div className={sideNavItemStyle.isOffContentContainer}>
      {icon}
      <span className={sideNavItemStyle.isOffContentItem}>{text}</span>
    </div>
  ) : (
    <>{text} </>
  );

  const curContent = isOn ? isOnContent : isOffContent;
  return curContent;
}

export default SideNavItem;
