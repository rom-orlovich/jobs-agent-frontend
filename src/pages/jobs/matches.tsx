import { getServerSideProps } from '.';

export { getServerSideProps };

import React from 'react';
import Jobs from '@/components/JobsPage/Jobs';
import PageHead from '@/components/Layout/PageHead/PageHead';
import { InferGetServerSidePropsType } from 'next';

function JobMatchPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <PageHead title="Jobs" description="Here is the place to find all the matches job." />
      <Jobs initialsProps={props} isMatchPage />
    </>
  );
}

export default JobMatchPage;
