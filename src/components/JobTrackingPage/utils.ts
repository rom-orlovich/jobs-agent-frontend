import { JobsTrackingFiltersFields } from '@/hooks/useFiltersHooks/useFiltersTrackingJobs';
import { Job } from '@/lib/types/jobsScanner.types';

/**
 * @param {JobsTrackingFiltersFields} filterValues The current jobs tracking's filter values fields.
 * @param {Job[] | undefined} jobs The current jobs tracking that suppose to be filtered
 * @returns {Job[] | undefined} The current jobs tracking filter by filter values fields.
 */
export const filtersJobsTracking = (
  filterValues: JobsTrackingFiltersFields,
  jobs?: Job[]
): Job[] | undefined => {
  let currentJobs = jobs;
  const { title, CVwasSent, afterUpdateDate, currentStageName, company } = filterValues;

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

  if (company)
    currentJobs = currentJobs?.filter((jobs) =>
      jobs.company.toLowerCase().includes(company.toLowerCase())
    );

  if (currentStageName)
    currentJobs = currentJobs?.filter((jobs) =>
      jobs.info?.stages.at(-1)?.name.toLowerCase().includes(currentStageName.toLowerCase())
    );
  return currentJobs;
};

/**
 * @param {Job[] | undefined} jobs The current jobs tracking that suppose to be sorted
 * @returns {Job[] | undefined} The current jobs tracking sort by their updatedAt field.
 */
export const sortJobsTrackingByCreatedDate = (jobs?: Job[]): Job[] | undefined => {
  return jobs?.sort(
    (a, b) => new Date(b.info?.updatedAt || '').getTime() - new Date(a.info?.updatedAt || '').getTime()
  );
};

export interface JobsTrackingFiltersValues {
  titles: string[];
  currentStageNames: string[];
  companies: string[];
}

/**
 * @param {Job[]} jobs The current jobs tracking.
 * @returns { JobsTrackingFiltersValues} An object of unique string arrays of titles and currentStageNames of all the user's jobs tracking data.
 */
export const createJobsTrackingFiltersArrValues = (jobs?: Job[]): JobsTrackingFiltersValues => {
  const titles: Set<string> = new Set([]);
  const currentStageNames: Set<string> = new Set([]);
  const companies: Set<string> = new Set([]);
  jobs?.forEach((job) => {
    const curStageName = job.info?.stages.at(-1)?.name;
    if (job.title) titles.add(job.title);
    if (curStageName) currentStageNames.add(curStageName);
    if (job.company) companies.add(job.company);
  });

  return {
    titles: [...titles],
    currentStageNames: [...currentStageNames],
    companies: [...companies]
  };
};
