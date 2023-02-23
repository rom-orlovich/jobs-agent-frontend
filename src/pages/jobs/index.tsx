import { SERVER_URL } from '@/lib/endpoints';
import { fetchData } from '@/lib/utils';

import { JobsPosts } from 'mongoDB/lib/types';
import { GetServerSidePropsContext, InferGetStaticPropsType } from 'next';
import { getServerSession } from 'next-auth';
// import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]';
// import { authOptions } from '../api/auth/[...nextauth]';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  // const user = await getUserByID(session?.user.id || '');

  const data = await fetchData<JobsPosts[]>(`${SERVER_URL}/jobs/${session?.user.id}`);

  return {
    props: {
      jobs: data || []
    }
  };
};
function Jobs({ jobs }: InferGetStaticPropsType<typeof getServerSideProps>) {
  return (
    <div>
      {jobs?.map((el) => {
        return <li key={el.jobID}>{el.title}</li>;
      })}
    </div>
  );
}

// ``;
// function Jobs() {
//   return (
//     <div>
//       {jobs.map((el) => {
//         <li key={el.jobID}>{el.title}</li>;
//       })}
//     </div>
//   );
// }
``;

export default Jobs;
