import { MESSAGES } from './messages';
export type MessageKeys = keyof typeof MESSAGES;
export interface ResponseScanner {
  message: string;
  success?: boolean;
  code: MessageKeys;
}
export interface TrackInfo {
  createdAt: Date;
  sendCV: { date: Date; status: boolean };
  stages: { date: Date; name: string; status: boolean; note: string }[];
}
export interface Job {
  jobID: string;
  title: string;
  company: string;
  location: string;
  link: string;
  reason?: string;
  date?: string;
  from: string;
  createdAt?: Date;
  text: string;
  hashQueries?: string[];
  track?: TrackInfo;
}

export interface FacetFilterResults {
  titles: string[];
  from: string[];
  companies: string[];
  locations: string[];
  reasons: string[];
}
export type ResponseGetJobs = {
  jobs: Job[];
  pagination: { totalPages: number; totalDocs: number; hasMore: boolean; numResultsFound: number };
  filters: FacetFilterResults;
};
export type Args = Readonly<{ arg: { hash?: string } }>;
