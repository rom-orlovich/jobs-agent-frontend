import { MESSAGES } from './messages';
import { OmitKey } from './types/types';
export type MessageKeys = keyof typeof MESSAGES;
export interface ResponseScanner {
  message: string;
  success?: boolean;
  code: MessageKeys;
}
export interface TrackInfo {
  createdAt: Date;
  sendCV?: { date?: Date; pass?: boolean };
  stages: { date?: Date; name: string; pass: boolean; feedback: string }[];
}
export type TrackInfoFormFormat = {
  createdAt: string;
  sendCV: { date: string; pass: boolean };
  stages: ({ date: string } & OmitKey<TrackInfo['stages'][0], 'date'>)[];
};
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
  info?: TrackInfo;
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
