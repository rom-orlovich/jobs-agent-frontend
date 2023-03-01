export const APP_ROUTES = {
  SEARCH_PAGE: 'search',
  JOBS_PAGE: 'jobs',
  JOBS_TRACK: 'jobs/jobsTrack',

  JOBS_TRACK_EDIT: (jobID: string) => `jobs/${jobID}/track`,
  SEARCH_HISTORY_PAGE: 'search/history'
};
