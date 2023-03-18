import { useAuthContext } from '@/context/AuthContext';
import useJobsTrackingFilter from '@/hooks/useFiltersHooks/useFiltersTrackingJobs';

// import useFilterJobs from '@/hooks/useFilterJobs';
// import useJobsTrackingFilter from '@/hooks/useFiltersTrackingJobs';
import useRedirect from '@/hooks/useRedirect';
import { createToastsByDataIfExist } from '@/lib/utils';
import React from 'react';
import JobsFeed from '../JobsPage/JobFeed/JobsFeed';
import JobsTrackingHeader from './JobTrackingHeader';

import {
  createJobsTrackingFiltersArrValues,
  filtersJobsTracking,
  sortJobsTrackingByCreatedDate
} from './utils';

function JobsTracking() {
  //Get user profile data.
  const { userProfileData } = useAuthContext();

  //Check if the the exist and redirect to home page and display proper message.
  useRedirect(
    createToastsByDataIfExist(
      'TRACKING_JOBS_ARE_FOUND',
      'TRACKING_JOBS_ARE_NOT_FOUND',
      userProfileData?.tracking
    )
  );

  const filterTrackingJobsProps = useJobsTrackingFilter();

  let jobs = filtersJobsTracking(filterTrackingJobsProps.formValues, userProfileData.tracking);

  jobs = sortJobsTrackingByCreatedDate(jobs);
  const jobsTrackingFilters = createJobsTrackingFiltersArrValues(jobs);

  return (
    <div className="pr-8 xs:pr-16">
      <JobsTrackingHeader
        numResultsFound={jobs?.length}
        filtersTrackingJobsProps={filterTrackingJobsProps}
        jobsTrackingFilters={jobsTrackingFilters}
      />
      <JobsFeed jobs={jobs} userProfileData={userProfileData} isTrackingFeed={true} />
    </div>
  );
}

export default JobsTracking;
