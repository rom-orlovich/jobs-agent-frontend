// import { getUserByID } from 'mongoDB/handlers';
// import { GetServerSidePropsContext, InferGetStaticPropsType } from 'next';
// import { getServerSession } from 'next-auth';
import React from 'react';
// import { authOptions } from '../api/auth/[...nextauth]';

// export const getServerSideProps = async (context: GetServerSidePropsContext) => {
//   const session = await getServerSession(context.req, context.res, authOptions);
//   const user = await getUserByID(session?.user.id || '');
//   // const jobs = await getJobsPostsByTitle("",user?.userQuery);
//   return {
//     props: {
//       jobs: jobs
//     }
//   };
// };
// function Jobs({ jobs }: InferGetStaticPropsType<typeof getServerSideProps>) {
//   return (
//     <div>
//       {jobs.map((el) => {
//         <li key={el.jobID}>{el.title}</li>;
//       })}
//     </div>
//   );
// }
// ``;
function Jobs() {
  return (
    <div>
      {/* {jobs.map((el) => {
        <li key={el.jobID}>{el.title}</li>;
      })} */}
    </div>
  );
}
``;

export default Jobs;
