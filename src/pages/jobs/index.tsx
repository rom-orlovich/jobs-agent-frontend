import useRedirectHome from '@/hooks/useRedirctHome';

import { jobsFetcher, noJobFoundCBwithToast } from '@/lib/jobs.utils';
import { ResponseGetJobs } from '@/lib/jobsScanner.types';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react';

import { authOptions } from '../api/auth/[...nextauth]';
// import useInfiniteSwr from "swr/infinite"

export const getServerSideProps: GetServerSideProps<ResponseGetJobs> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  const hash = context.query.hash;

  const data = await jobsFetcher(session?.user.id || '', {
    hash
  });
  const defaultResponseJob: ResponseGetJobs = {
    jobs: [],
    pagination: {
      hasMore: false,
      totalDocs: 0,
      totalPages: 1
    }
  };

  return {
    props: data || defaultResponseJob
  };
};
function Jobs({ jobs }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useRedirectHome(() => noJobFoundCBwithToast(jobs));

  return (
    <ul dir="ltr" className="flex flex-wrap justify-center gap-2 p-8">
      {jobs?.map((el, i) => {
        return (
          <li
            className="rounded-md bg-white p-4 shadow-md sm:flex-[50%] md:flex-[30%]"
            key={el.jobID + i}
          >
            <div>
              <Link href={el.link}> {el.title}</Link>{' '}
            </div>
            <div> {el.from} </div>
            <div> {el.reason || 'jobs is match'} </div>
          </li>
        );
      })}
    </ul>
  );
}

export default Jobs;
