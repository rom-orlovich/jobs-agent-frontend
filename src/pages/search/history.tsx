import PageHead from '@/components/Layout/PageHead/PageHead';
import SearchHistoryPage from '@/components/SearchHistoryPage/SearchHistoryPage';
// import SearchHistoryFeed from '@/components/SearchHistory/SearchHistoryFeed';
import React from 'react';

function History() {
  return (
    <>
      <PageHead
        title="Search Queries History"
        description="The page display the history search queries of current user."
      />

      <SearchHistoryPage />
    </>
  );
}

export default History;
