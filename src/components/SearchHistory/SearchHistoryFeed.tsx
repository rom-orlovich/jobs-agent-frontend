import { useAuthContext } from '@/context/AuthContext';
import React from 'react';
import SearchItem from './SearchItem';

import useDownloadController from '@/hooks/useDownloadController';
import useScannerController from '@/hooks/useScannerController';

const searchHistoryFeedStyle = {
  feed: 'pr-12 justify-center flex flex-col md:max-w-[100%] max-w-[100%]'
};
function SearchHistoryFeed() {
  const authContext = useAuthContext();
  const downloadController = useDownloadController(authContext);
  const scannerController = useScannerController(authContext);

  const { userHistoryQueries } = authContext;
  return (
    <ul className={searchHistoryFeedStyle.feed}>
      {userHistoryQueries.map((query, i) => {
        const hash = query?.hash || '';
        return <SearchItem key={hash + i} {...query} {...downloadController} {...scannerController} />;
      })}
    </ul>
  );
}

export default SearchHistoryFeed;
