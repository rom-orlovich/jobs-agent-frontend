import { useAuthContext } from '@/context/AuthContext';
import { useScannerContext } from '@/context/ScannerContext';
import { classIsOn, classNameGenerator, createURL, getResMessage } from '@/lib/utils';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import { LINKS } from './lib/links';
import SidebarItem from './SideNavItem/SidebarItem';

const sideLinksItemsStyle = {
  links: 'mt-2 flex flex-col items-center gap-4 w-full',
  linksOffMode: 'h-[70%]  gap-8 justify-center',
  icon: 'text-2xl'
};

function SideLinksItems({ isON }: { isON: boolean }) {
  const { userProfileData } = useAuthContext();
  const { scanner } = useScannerContext();
  const router = useRouter();

  const hash = userProfileData.activeHash;

  const sharedQueriesParams = {
    hash: hash,
    page: 1
  };
  const originLinks = LINKS(sideLinksItemsStyle.icon);
  const linksItems = LINKS(sideLinksItemsStyle.icon);

  //Set jobs page's and jobs matches page's link to be with user's current active hash
  linksItems[1].link = createURL([linksItems[1].link], sharedQueriesParams);
  linksItems[2].link = createURL([linksItems[2].link], {
    ...sharedQueriesParams,
    reason: 'match'
  });

  const disableByMutateHandler: React.MouseEventHandler<Element> = (e) => {
    if (scanner.isMutating) {
      e.preventDefault();
      toast(getResMessage('SEARCH_IS_IN_PROCESS').message);
    }
  };

  return (
    <ul
      className={classNameGenerator(
        sideLinksItemsStyle.links,
        classIsOn(!isON, sideLinksItemsStyle.linksOffMode)
      )}
    >
      {linksItems.map((link, i) => {
        return (
          <SidebarItem
            isMutate={(i === 1 || i === 2) && scanner.isMutating}
            isON={isON}
            onClickMutate={disableByMutateHandler}
            isActiveLink={router.pathname === originLinks[i].link}
            key={link.link + i}
            {...link}
          />
        );
      })}
    </ul>
  );
}

export default SideLinksItems;
