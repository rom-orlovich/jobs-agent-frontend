import { useAuthContext } from '@/context/AuthContext';
import React from 'react';
import SearchItem from './SearchItem';
const searchHistoryFeedStyle = {
  feed: 'pr-12 flex flex-col lg:max-w-[70%] max-w-[100%]'
};

function SearchHistoryFeed() {
  const authContext = useAuthContext();
  const { userHistoryQueries } = authContext;
  return (
    <ul className={searchHistoryFeedStyle.feed}>
      {userHistoryQueries.map((query, i) => {
        const hash = query?.hash || '';
        return <SearchItem key={hash + i} {...query} />;
      })}
    </ul>
  );
}

export default SearchHistoryFeed;
