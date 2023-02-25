import { Job } from '@/lib/jobsScanner.types';

import React from 'react';
import JobItem from './JobItem';

function JobsFeed({ jobs }: { jobs: Job[] }) {
  return (
    <ul dir="ltr" className="flex h-full flex-wrap justify-center gap-2 py-4 xs:px-8 xs:pr-16">
      {jobs?.map((job, i) => {
        return <JobItem key={job.jobID + i} {...job} index={i} />;
      })}
    </ul>
  );
}

export default JobsFeed;
