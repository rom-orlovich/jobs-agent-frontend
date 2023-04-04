import PageHead from '@/components/Layout/PageHead/PageHead';
import SearchHistoryPage from '@/components/SearchHistoryPage/SearchHistoryPage';
import { getInitialUserProfile } from '@/lib/getInitialUserProfile';
import { GetServerSidePropsContext } from 'next';

import React from 'react';
//Get the initial user profile before the client load.
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return getInitialUserProfile(ctx);
}
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
