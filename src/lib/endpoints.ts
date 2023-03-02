const PREFIX = 'api';
export const API_ENDPOINTS = {
  USERS: `${PREFIX}/users`,
  JOBS_TRACKINGING_INFO: (userID: string) => `${userID}/tracking`,
  LOCATIONS: `${PREFIX}/locations`,
  POSITIONS: `${PREFIX}/positions`,
  SCANNER_START: `${PREFIX}/jobs-agent/start`,
  SCANNER_DOWNLOAD: `${PREFIX}/jobs-agent/download`,
  GET_JOBS: `${PREFIX}/jobs-agent/jobs`
};
export const CLIENT_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_CLIENT_URL;
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
