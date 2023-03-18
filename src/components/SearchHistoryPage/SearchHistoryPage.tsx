import { useAuthContext } from '@/context/AuthContext';
import useHistoryQueriesFilters from '@/hooks/useFiltersHooks/useHistoryQueriesFilters';

import useRedirect from '@/hooks/useRedirect';
import { createToastsByDataIfExist } from '@/lib/utils';
import React from 'react';
import SearchHistoryFeed from './SearchHistoryFeed';
import SearchHistoryHeader from './SearchHistoryHeader';
import {
  createHistoryQueriesFiltersArrValues,
  filterHistoryQueries,
  sortUserHistoryQueries
} from './utils';

function SearchHistoryPage() {
  const authContext = useAuthContext();
  const { userHistoryQueries, userProfileData } = authContext;
  //Check the status of the data and display proper message.
  //If The data it not exist, redirect to the home page.
  useRedirect(
    createToastsByDataIfExist('SEARCH_HISTORY_FOUND', 'SEARCH_HISTORY_NOT_FOUND', userHistoryQueries)
  );

  //Initialize the hook the handle user's history search queries filters.
  const historyQueriesFiltersProps = useHistoryQueriesFilters();

  //Filter the user's history search queries by formValues of the useHistoryQueriesFilters hook.
  const historyQueriesAfterFilters = filterHistoryQueries(
    userHistoryQueries,
    historyQueriesFiltersProps.formValues
  );

  //Sort the user Queries by the date. The new one will be first.
  const sortHistoryQueries = sortUserHistoryQueries(historyQueriesAfterFilters);

  //Create an object of unique string values arrays that are used to filter
  //the user's history search queries.
  const historyQueriesSearchFilters = createHistoryQueriesFiltersArrValues(sortHistoryQueries);

  // //Display only the user Queries that are already been scanned and have hash field.
  // const filterHistoryQueries = userHistoryQueries.filter((userQuery) => userQuery.hash);
  return (
    <div className="flex flex-col gap-4 pr-8 sm:max-w-[85%] sm:pr-16 ">
      <SearchHistoryHeader
        numResultsFound={sortHistoryQueries.length}
        historyQueriesSearchFilters={historyQueriesSearchFilters}
        historyQueriesSearchProps={historyQueriesFiltersProps}
      />
      <SearchHistoryFeed historyQueries={sortHistoryQueries} userProfileData={userProfileData} />
    </div>
  );
}

export default SearchHistoryPage;
