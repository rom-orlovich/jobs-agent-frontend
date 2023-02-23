import { API_ENDPOINTS, SERVER_URL } from '@/lib/endpoints';
import { fetchData } from '@/lib/utils';

import { JobsPosts } from 'mongoDB/lib/types';
import { GetServerSidePropsContext, InferGetStaticPropsType } from 'next';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]';
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const data = await fetchData<JobsPosts[]>(
    `${SERVER_URL}/${API_ENDPOINTS.GET_JOBS}/${session?.user.id}`
  );

  return {
    props: {
      jobs: data || []
    }
  };
};
function Jobs({ jobs }: InferGetStaticPropsType<typeof getServerSideProps>) {
  return (
    <ul className="flex flex-wrap justify-center gap-2 p-4">
      {jobs?.map((el) => {
        return (
          <li className="rounded-md bg-white p-4 shadow-md" key={el.jobID}>
            <div>
              <Link href={el.link}> {el.title}</Link>{' '}
            </div>

            <div> {el.from} </div>
            <div> {el.reason} </div>
          </li>
        );
      })}
    </ul>
  );
}

export default Jobs;
