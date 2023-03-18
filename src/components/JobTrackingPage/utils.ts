import { JobsTrackingFiltersFields } from '@/hooks/useFiltersHooks/useFiltersTrackingJobs';
import { Job } from '@/lib/types/jobsScanner.types';

/**
 * @param {JobsTrackingFiltersFields} filterValues The current jobs tracking's filter values fields
 * @param {Jobs[] | undefined} jobs The current jobs tracking that suppose to be filtered
 * @returns {Jobs[] | undefined} The current jobs tracking filter by filter values fields.
 */
export const filtersJobsTracking = (filterValues: JobsTrackingFiltersFields, jobs?: Job[]) => {
  let currentJobs = jobs;
  const { title, CVwasSent, afterUpdateDate, currentStageName } = filterValues;

  if (title)
    currentJobs = currentJobs?.filter((jobs) => jobs.title.toLowerCase().includes(title.toLowerCase()));

  if (CVwasSent !== undefined)
    currentJobs = currentJobs?.filter((jobs) => {
      return jobs.info?.statusCV?.wasSent === CVwasSent;
    });
  if (afterUpdateDate)
    currentJobs = currentJobs?.filter(
      (jobs) =>
        new Date(jobs.info?.updatedAt as unknown as string).getTime() >=
        new Date(afterUpdateDate).getTime()
    );
  if (currentStageName)
    currentJobs = currentJobs?.filter((jobs) =>
      jobs.info?.stages.at(-1)?.name.toLowerCase().includes(currentStageName.toLowerCase())
    );
  return currentJobs;
};

/**
 * @param {Jobs[] | undefined} jobs The current tracking jobs that suppose to be sorted
 * @returns {Jobs[] | undefined} The current jobs tracking sort by their updatedAt field.
 */
export const sortJobsTrackingByCreatedDate = (jobs?: Job[]) => {
  return jobs?.sort(
    (a, b) => new Date(b.info?.updatedAt || '').getTime() - new Date(a.info?.updatedAt || '').getTime()
  );
};

export const createJobsTrackingFiltersArrValues = (jobs?: Job[]) => {
  const titles: Map<string, string> = new Map([]);
  const currentStageNames: Map<string, string> = new Map([]);
  jobs?.forEach((job) => {
    const curStageName = job.info?.stages.at(-1)?.name;
    if (job.title) titles.set(job.title, job.title);
    if (curStageName) currentStageNames.set(curStageName, curStageName);
  });

  return {
    titles: [...titles.values()],
    currentStageNames: [...currentStageNames.values()]
  };
};
