import { useAuthContext } from '@/context/AuthContext';
import React from 'react';
import SearchItem from './SearchItem';
import useDownloadController from '@/hooks/useDownloadController';

import { useRouter } from 'next/router';
import { TriggerByHash } from '../Buttons/Button.types';
import { deleteUserQuery } from '@/lib/api/users.utils';
import { mutate } from 'swr';
import { API_ENDPOINTS } from '@/lib/endpoints';
import { sortUserHistoryQueries } from './utils';
import { toast } from 'react-toastify';
import useRedirect from '@/hooks/useRedirect';
import { createToastsByDataIfExist } from '@/lib/utils';
import { useScannerContext } from '@/context/ScannerContext';
// import { useScannerContext } from '@/context/ScannerContext';

const searchHistoryFeedStyle = {
  feed: 'sm:pr-16 pr-8 justify-center flex flex-col md:max-w-[100%] max-w-[100%] gap-4'
};
function SearchHistoryFeed() {
  const router = useRouter();
  const authContext = useAuthContext();
  //Initialize the button hooks.
  const downloadController = useDownloadController(authContext);
  const scannerController = useScannerContext();
  const { userHistoryQueries, userProfileData } = authContext;

  //Check the status of the data and display proper message.
  //If The data it not exist, redirect to the home page.
  useRedirect(
    createToastsByDataIfExist('SEARCH_HISTORY_FOUND', 'SEARCH_HISTORY_NOT_FOUND', userHistoryQueries)
  );

  //Sort the user Queries by the date. The new one will be first.
  const sortHistoryQueries = sortUserHistoryQueries(userHistoryQueries);

  //Handle the edit button click.
  const handleEditButton: TriggerByHash = (hash) => (e) => {
    try {
      e.preventDefault();
      //Move to the home page with the hash of the current clicked search query.
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

  //Handle the delete button click.
  const handleDeleteButton: TriggerByHash = (hash) => async (e) => {
    try {
      e.preventDefault();
      //Delete the current clicked user's search query.
      const result = await deleteUserQuery(userProfileData.userID || '', hash || '');

      //Revalidate the user data.
      await mutate(`/${API_ENDPOINTS.USERS}/${userProfileData.userID}`);

      //Trigger toast with result message
      toast(result.message);
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
