import PageHead from '@/components/Layout/PageHead/PageHead';
import SearchHistoryPage from '@/components/SearchHistoryPage/SearchHistoryPage';
import React from 'react';
import { getServerSideProps } from '@/lib/getInitialUserProfile';
//Get the initial user profile before the client load.
export { getServerSideProps };

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
