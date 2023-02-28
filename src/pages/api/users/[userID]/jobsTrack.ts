import { Job } from '@/lib/jobsScanner.types';

import { getResMessage } from '@/lib/utils';
import { addJobTrack } from 'mongoDB/handlers';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //   const jobTrackItem = req.body;
  const userID = String(req.query.userID);

  const jobData = req.body as Job;
  console.log(jobData);
  if (req.method === 'POST') {
    if (!userID) return res.status(400).send(getResMessage('USER_ID_NOT_VALID'));

    const result = await addJobTrack(userID, jobData);
    if (result?.modifiedCount) return res.status(201).send(getResMessage('TRACK_JOB_CREATED'));
    else {
      return res.status(400).send(getResMessage('TRACK_JOB_NOT_CREATED'));
    }
  }
  if (req.method === 'PUT') {
    return res.status(404).send(getResMessage('SOMETHING_WRONG'));
  }
}
