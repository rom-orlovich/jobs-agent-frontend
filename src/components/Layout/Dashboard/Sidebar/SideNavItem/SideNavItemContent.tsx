import React, { ReactNode } from 'react';

export interface SideNavItemContentProps {
  icon: ReactNode;
  text: string;
  isOn: boolean;
}

const SideNavItemContentStyle = {
  isOnContent: 'group flex justify-start gap-3 w-full',
  isOffContentContainer: 'group relative flex justify-center',
  isOffContentItem:
    'absolute top-[-2px] hidden translate-x-[0px] rounded-md bg-white px-1 text-lg text-black shadow-lg duration-100 group-hover:block group-hover:translate-x-[-63px] group-hover:transition'
};
/**
 * SideNavItemContent component create hover effect when the sidebar is close and regular display when its on.
 */
function SideNavItemContent({ icon, text, isOn }: SideNavItemContentProps) {
  const isOnContent = (
    <div className={SideNavItemContentStyle.isOnContent}>
      {icon && icon}
      {text}
    </div>
  );
  const isOffContent = icon ? (
    <div className={SideNavItemContentStyle.isOffContentContainer}>
      {icon}
      <span className={SideNavItemContentStyle.isOffContentItem}>{text}</span>
    </div>
  ) : (
    <>{text} </>
  );

  const curContent = isOn ? isOnContent : isOffContent;
  return curContent;
}

export default SideNavItemContent;
