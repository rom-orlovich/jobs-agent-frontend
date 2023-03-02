export const APP_ROUTES = {
  SEARCH_PAGE: 'search',
  JOBS_PAGE: 'jobs',
  JOBS_TRACKINGING: 'jobs/tracking',

  JOBS_TRACKINGING_INFO: (jobID: string) => `jobs/tracking/${jobID}/info`,
  SEARCH_HISTORY_PAGE: 'search/history'
};
