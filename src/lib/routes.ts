export const APP_ROUTES = {
  SEARCH_PAGE: 'search',
  JOBS_PAGE: 'jobs',
  JOBS_TRACKING: 'jobs/tracking',

  JOBS_TRACKING_INFO: (jobID: string) => `jobs/tracking/${jobID}/info`,
  SEARCH_HISTORY_PAGE: 'search/history'
};
