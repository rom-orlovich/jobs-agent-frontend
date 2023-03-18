// import { useAuthContext } from '@/context/AuthContext';
import React from 'react';
import SearchItem from './SearchItem';
import useDownloadController from '@/hooks/useDownloadController';

import { useRouter } from 'next/router';
import { TriggerByHash } from '../Buttons/Button.types';
import { deleteUserQuery } from '@/lib/api/users.utils';
import { mutate } from 'swr';
import { API_ENDPOINTS } from '@/lib/endpoints';
// import { sortUserHistoryQueries } from './utils';
import { toast } from 'react-toastify';
// import useRedirect from '@/hooks/useRedirect';
// import { createToastsByDataIfExist } from '@/lib/utils';
import { useScannerContext } from '@/context/ScannerContext';
import { UserProfileWithOneUserQuery, UserQuery } from '@/lib/types/api.types';
const searchHistoryFeedStyle = {
  feed: 'justify-center flex flex-col md:max-w-[100%] max-w-[100%] gap-4'
};
function SearchHistoryFeed({
  historyQueries,
  userProfileData
}: {
  userProfileData: UserProfileWithOneUserQuery;
  historyQueries: UserQuery[];
}) {
  const router = useRouter();
  // const authContext = useAuthContext();
  //Initialize the button hooks.
  const downloadController = useDownloadController();
  const scannerController = useScannerContext();
  // const { userHistoryQueries, userProfileData } = authContext;

  // //Check the status of the data and display proper message.
  // //If The data it not exist, redirect to the home page.
  // useRedirect(
  //   createToastsByDataIfExist('SEARCH_HISTORY_FOUND', 'SEARCH_HISTORY_NOT_FOUND', userHistoryQueries)
  // );

  //Display only the user Queries that are already been scanned and have hash field.
  // const filterHistoryQueries = userHistoryQueries.filter((userQuery) => userQuery.hash);

  //Sort the user Queries by the date. The new one will be first.
  // const sortHistoryQueries = sortUserHistoryQueries(filterHistoryQueries);

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
      {historyQueries.map((query, i) => {
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