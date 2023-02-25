import { MESSAGES } from './messages';
export type MessageKeys = keyof typeof MESSAGES;
export interface ResponseScanner {
  message: string;
  success?: boolean;
  code: MessageKeys;
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
}
export type ResponseGetJobs = {
  jobs: Job[];
  pagination: { totalPages: number; totalDocs: number; hasMore: boolean };
};
