import { useAuthContext } from '@/context/AuthContext';
import React from 'react';
import SearchItem from './SearchItem';

import useDownloadController from '@/hooks/useDownloadController';
import useScannerController from '@/hooks/useScannerController';
import { useRouter } from 'next/router';
import { TriggerByHash } from '../Buttons/Button.types';
import { deleteUserQuery } from '@/lib/api/users.utils';
import { mutate } from 'swr';
import { API_ENDPOINTS } from '@/lib/endpoints';

const searchHistoryFeedStyle = {
  feed: 'pr-16 justify-center flex flex-col md:max-w-[100%] max-w-[100%] gap-4'
};
function SearchHistoryFeed() {
  const router = useRouter();
  const authContext = useAuthContext();
  const downloadController = useDownloadController(authContext);
  const scannerController = useScannerController(authContext, true);
  const { userHistoryQueries, userProfileData } = authContext;
  const getTime = (createdAt?: string) => new Date(createdAt || '').getTime();
  const sortHistoryQueries = userHistoryQueries
    .slice()
    .sort((a, b) => getTime(b.createdAt) - getTime(a.createdAt));

  const handleEditButton: TriggerByHash = (hash) => (e) => {
    try {
      e.preventDefault();
      router.push({
        pathname: `/`,
        query: {
          hash
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteButton: TriggerByHash = (hash) => async (e) => {
    try {
      e.preventDefault();

      const res = await deleteUserQuery(userProfileData.userID || '', hash || '');
      await mutate(`${API_ENDPOINTS.USERS}/${userProfileData.userID}`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ul className={searchHistoryFeedStyle.feed}>
      {sortHistoryQueries.map((query, i) => {
        const hash = query?.hash || '';
        return (
          <SearchItem
            handleDeleteButton={handleDeleteButton}
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
