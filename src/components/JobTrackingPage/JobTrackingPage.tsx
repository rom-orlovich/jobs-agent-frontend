import { useAuthContext } from '@/context/AuthContext';
import useFilterTrackingJobs from '@/hooks/useFiltersTrackingJobs';
// import useFilterJobs from '@/hooks/useFilterJobs';
// import useFilterTrackingJobs from '@/hooks/useFiltersTrackingJobs';
import useRedirect from '@/hooks/useRedirect';
import { createToastsByDataIfExist } from '@/lib/utils';
import React from 'react';
import JobsFeed from '../JobsPage/JobFeed/JobsFeed';
import JobsTrackingSearch from './JobTrackingSearch/JobsTrackingSearch';
import {
  createJobsTrackingFilterArrValues,
  filtersJobsTracking,
  sortJobsTrackingByCreatedDate
} from './utils';

function JobTrackingPage() {
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
  const filterTrackingJobsProps = useFilterTrackingJobs();
  let jobs = filtersJobsTracking(filterTrackingJobsProps.formValues, userProfileData.tracking);
  jobs = sortJobsTrackingByCreatedDate(jobs);
  const jobsTrackingFilters = createJobsTrackingFilterArrValues(jobs);
  return (
    <div className="pl-4 pr-12 xs:pr-20">
      <JobsTrackingSearch
        filtersTrackingJobsProps={filterTrackingJobsProps}
        jobsTrackingFilters={jobsTrackingFilters}
      />
      <JobsFeed jobs={jobs} userProfileData={userProfileData} isTrackingFeed={true} />
    </div>
  );
}

export default JobTrackingPage;
