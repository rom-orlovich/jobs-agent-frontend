import { Job } from '@/lib/jobsScanner.types';

import { getResMessage } from '@/lib/utils';
import { addJobTracking, deleteJobTracking, updateJobTracking } from 'mongoDB/lib/jobTracking';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userID = String(req.query.userID);
  if (!userID) return res.status(400).send(getResMessage('USER_ID_NOT_VALID'));

  let result;

  //POST request to /api/users/<userID>/tracking
  if (req.method === 'POST') {
    const jobData = req.body as Job;
    //Add job tracking data.
    result = await addJobTracking(userID, jobData);

    //In case when the job tracking data is created.
    if (result?.modifiedCount) return res.status(201).send(getResMessage('TRACKING_JOB_CREATED'));

    //In case when there is no change in job tracking data.
    if (result?.matchedCount) return res.status(204).send(getResMessage('FOUNDED_BUT_NOT_MODIFIED'));
    return res.status(400).send(getResMessage('TRACKING_JOB_NOT_CREATED'));
  }

  //PUT request to /api/users/<userID>/tracking/<jobID>
  if (req.method === 'PUT') {
    const jobData = req.body as Job;

    //Update job tracking data.
    result = await updateJobTracking(userID, jobData);

    //In case when the job tracking data is updated.
    if (result?.modifiedCount) return res.status(201).send(getResMessage('TRACKING_JOB_UPDATED'));

    //In case when there is no change in job tracking data.
    if (result?.matchedCount) return res.status(204).send(getResMessage('FOUNDED_BUT_NOT_MODIFIED'));
    return res.status(400).send(getResMessage('TRACKING_JOB_NOT_UPDATED'));
  }

  //DELETE request to /api/users/<userID>/tracking/<jobID>
  if (req.method === 'DELETE') {
    const jobID = Array.isArray(req.query.jobID) ? req.query.jobID[0] : String(req.query.jobID);

    //Delete job tracking data.
    result = await deleteJobTracking(userID, jobID);

    //In case when the job tracking data is deleted.
    if (result?.modifiedCount) return res.status(200).send(getResMessage('TRACKING_JOB_DELETED'));
    //In case when there is no change in job tracking data.
    if (result?.matchedCount) return res.status(204).send(getResMessage('FOUNDED_BUT_NOT_MODIFIED'));
  }

  //Only when no user is found.
  if (!result?.matchedCount) {
    return res.status(400).send(getResMessage('USER_NOT_FOUND'));
  }
  //When the above conditions are false.
  if (!result?.acknowledged) {
    return res.status(404).send(getResMessage('SOMETHING_WRONG'));
  }
}
