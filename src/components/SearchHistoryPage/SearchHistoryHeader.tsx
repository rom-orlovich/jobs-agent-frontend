import React from 'react';

import HistoryQueriesSearch, {
  // eslint-disable-next-line object-curly-newline
  HistoryQueriesSearchProps
} from './HistoryQueriesSearch/HistoryQueriesSearch';
const JobsTrackingHeaderStyle = {
  searchHistoryHeader: 'flex justify-between xs:flex-col flex-col'
};
interface SearchHistoryHeaderProps extends HistoryQueriesSearchProps {
  numResultsFound?: number;
}
/**
 * The header component of SearchHistory page that display the num results and the search input.
 */
function SearchHistoryHeader({
  numResultsFound,
  historyQueriesSearchFilters,
  historyQueriesSearchProps
}: SearchHistoryHeaderProps) {
  const textHeader = 'חיפושים';
  return (
    <div className={JobsTrackingHeaderStyle.searchHistoryHeader}>
      <h1 className="xm:w-full mb-4 w-[105%] text-3xl xs:mb-0">
        כ- {numResultsFound || 0} {textHeader} נמצאו:
      </h1>
      <HistoryQueriesSearch
        historyQueriesSearchProps={historyQueriesSearchProps}
        historyQueriesSearchFilters={historyQueriesSearchFilters}
      />
    </div>
  );
}

export default SearchHistoryHeader;
