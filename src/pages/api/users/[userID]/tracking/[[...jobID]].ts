import { Job } from '@/lib/jobsScanner.types';

import { getResMessage } from '@/lib/utils';
import { addJobTracking, deleteJobTracking, updateJobTracking } from 'mongoDB/lib/handlers';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userID = String(req.query.userID);
  if (!userID) return res.status(400).send(getResMessage('USER_ID_NOT_VALID'));

  let result;
  if (req.method === 'POST') {
    const jobData = req.body as Job;
    result = await addJobTracking(userID, jobData);
    if (result?.modifiedCount) return res.status(201).send(getResMessage('TRACK_JOB_CREATED'));
    if (result?.matchedCount) return res.status(204).send(getResMessage('FOUNDED_BUT_NOT_MODIFIED'));
    return res.status(400).send(getResMessage('TRACK_JOB_NOT_CREATED'));
  }
  if (req.method === 'PUT') {
    const jobData = req.body as Job;
    result = await updateJobTracking(userID, jobData);
    if (result?.modifiedCount) return res.status(201).send(getResMessage('TRACK_JOB_CREATED'));
    if (result?.matchedCount) return res.status(204).send(getResMessage('FOUNDED_BUT_NOT_MODIFIED'));
    return res.status(400).send(getResMessage('TRACK_JOB_NOT_CREATED'));
  }
  if (req.method === 'DELETE') {
    const jobID = Array.isArray(req.query.jobID) ? req.query.jobID[0] : String(req.query.jobID);

    result = await deleteJobTracking(userID, jobID);

    if (result?.modifiedCount) return res.status(200).send(getResMessage('TRACK_JOB_DELETED'));
    if (result?.matchedCount) return res.status(204).send(getResMessage('FOUNDED_BUT_NOT_MODIFIED'));
  }

  if (!result?.matchedCount) {
    return res.status(400).send(getResMessage('USER_NOT_FOUND'));
  }

  if (!result?.modifiedCount) {
    return res.status(404).send(getResMessage('SOMETHING_WRONG'));
  }
}
