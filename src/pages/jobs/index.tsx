import { API_ENDPOINTS, SERVER_URL } from '@/lib/endpoints';
import { ResponseGetJobs } from '@/lib/jobsScanner.types';
import { fetchData } from '@/lib/utils';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { useRouter } from 'next/router';

import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { authOptions } from '../api/auth/[...nextauth]';
export const getServerSideProps: GetServerSideProps<ResponseGetJobs> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const data = await fetchData<ResponseGetJobs>(
    `${SERVER_URL}/${API_ENDPOINTS.GET_JOBS}/${session?.user.id}`
  );

  const defaultResponseJob: ResponseGetJobs = {
    jobs: [],
    pagination: {
      total: 0
    }
  };
  console.log(data);

  return {
    props: data || defaultResponseJob
  };
};
function Jobs({ jobs }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  useEffect(() => {
    if (!jobs.length) {
      toast('אף משרה לא נמצאה, בצע חיפוש נוסף.', {
        toastId: 'noJobsFound'
      });
      router.push('/', '/');
    }
  }, []);

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
