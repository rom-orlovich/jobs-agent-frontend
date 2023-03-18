import { JobsTrackingFiltersFields } from '@/hooks/useFiltersHooks/useFiltersTrackingJobs';
import { Job } from '@/lib/types/jobsScanner.types';
import { Option } from '../Inputs/SelectInput/selectInput.types';
/**
 * @param {JobsTrackingFiltersFields} filterValues The current jobs tracking's filter values fields
 * @param {Jobs[] | undefined} jobs The current jobs tracking that suppose to be filtered
 * @returns {Jobs[] | undefined} The current jobs tracking filter by filter values fields.
 */
export const filtersJobsTracking = (filterValues: JobsTrackingFiltersFields, jobs?: Job[]) => {
  let currentJobs = jobs;
  const { title, CVwasSent, afterUpdateDate, currentStageName } = filterValues;

  currentJobs = currentJobs?.filter((job) => {
    if (title) return job.title.toLowerCase().includes(title.toLowerCase());
    if (CVwasSent) return job.info?.statusCV?.wasSent;

    if (!!afterUpdateDate) {
      return (
        new Date(job.info?.createdAt as unknown as string).getTime() >=
        new Date(afterUpdateDate).getTime()
      );
    }
    if (currentStageName)
      return job.info?.stages.at(-1)?.name.toLowerCase().includes(currentStageName.toLowerCase());
    return true;
  });
  // if (title)
  //   currentJobs = currentJobs?.filter((jobs) => jobs.title.toLowerCase().includes(title.toLowerCase()));
  // if (CVwasSent) currentJobs = currentJobs?.filter((jobs) => jobs.info?.statusCV?.wasSent);
  // if (afterUpdateDate)
  //   currentJobs = currentJobs?.filter(
  //     (jobs) =>
  //       new Date(jobs.info?.createdAt as unknown as string).getTime() >=
  //       new Date(afterUpdateDate).getTime()
  //   );
  // if (currentStageName)
  //   currentJobs = currentJobs?.filter((jobs) =>
  //     jobs.info?.stages.at(-1)?.name.toLowerCase().includes(currentStageName.toLowerCase())
  //   );
  return currentJobs;
};

/**
 * @param {Jobs[] | undefined} jobs The current tracking jobs that suppose to be sorted
 * @returns {Jobs[] | undefined} The current jobs tracking sort by their createdAt field.
 */
export const sortJobsTrackingByCreatedDate = (jobs?: Job[]) => {
  return jobs?.sort(
    (a, b) => new Date(b.info?.createdAt || '').getTime() - new Date(a.info?.createdAt || '').getTime()
  );
};

export const createJobsTrackingFiltersArrValues = (jobs?: Job[]) => {
  const titles: Map<string, Option<string>> = new Map([]);
  const currentStageNames: Map<string, Option<string>> = new Map([]);
  jobs?.forEach((job) => {
    const curStageName = job.info?.stages.at(-1)?.name;
    if (job.title)
      titles.set(job.title, {
        title: job.title,
        value: job.title,
        id: job.jobID
      });
    if (curStageName)
      currentStageNames.set(curStageName, {
        title: curStageName,
        value: curStageName,
        id: job.jobID
      });
  });

  return {
    titles: [...titles.values()],
    currentStageNames: [...currentStageNames.values()]
  };
};
