import { useAuthContext } from '@/context/AuthContext';
import React from 'react';
import SearchItem from './SearchItem';

import useDownloadController from '@/hooks/useDownloadController';
import useScannerController from '@/hooks/useScannerController';
import { useRouter } from 'next/router';

import { APP_ROUTES } from '@/lib/routes';
import { TriggerByHash } from '../Buttons/Button.types';

const searchHistoryFeedStyle = {
  feed: 'pr-12 justify-center flex flex-col md:max-w-[100%] max-w-[100%] gap-4'
};
function SearchHistoryFeed() {
  const router = useRouter();
  const authContext = useAuthContext();
  const downloadController = useDownloadController(authContext);
  const scannerController = useScannerController(authContext);

  const { userHistoryQueries } = authContext;
  const getTime = (createdAt?: string) => new Date(createdAt || '').getTime();
  const sortHistoryQueries = userHistoryQueries.sort(
    (a, b) => getTime(b.createdAt) - getTime(a.createdAt)
  );

  const handleEditButton: TriggerByHash = (hash) => () => {
    router.push({
      pathname: `/${APP_ROUTES.SEARCH_PAGE}`,
      query: {
        hash
      }
    });
  };
  return (
    <ul className={searchHistoryFeedStyle.feed}>
      {sortHistoryQueries.map((query, i) => {
        const hash = query?.hash || '';
        return (
          <SearchItem
            handleEditButton={handleEditButton}
            key={hash + i}
            {...query}
            {...downloadController}
            {...scannerController}
          />
        );
      })}
    </ul>
  );
}

export default SearchHistoryFeed;
