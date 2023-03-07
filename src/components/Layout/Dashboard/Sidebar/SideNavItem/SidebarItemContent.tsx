import React, { ReactNode } from 'react';

export interface SidebarItemContentProps {
  icon: ReactNode;
  text: string;
  isOn: boolean;
}

const SidebarItemContentStyle = {
  isOnContent: 'group flex justify-start gap-3 w-full',
  isOffContentContainer: 'group relative flex justify-center',
  isOffContentItem:
    'absolute top-[-2px] hidden translate-x-[0px] rounded-md bg-white px-1 text-lg text-black shadow-lg duration-100 group-hover:block group-hover:translate-x-[-63px] group-hover:transition'
};
/**
 * SidebarItemContent component create hover effect when the sidebar is close and regular display when its on.
 */
function SidebarItemContent({ icon, text, isOn }: SidebarItemContentProps) {
  const isOnContent = (
    <div className={SidebarItemContentStyle.isOnContent}>
      {icon && icon}
      {text}
    </div>
  );
  const isOffContent = icon ? (
    <div className={SidebarItemContentStyle.isOffContentContainer}>
      {icon}
      <span className={SidebarItemContentStyle.isOffContentItem}>{text}</span>
    </div>
  ) : (
    <>{text} </>
  );

  const curContent = isOn ? isOnContent : isOffContent;
  return curContent;
}

export default SidebarItemContent;
