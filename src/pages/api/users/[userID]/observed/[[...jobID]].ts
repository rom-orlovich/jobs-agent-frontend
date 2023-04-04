import { getResMessage } from '@/lib/utils';
import { addToJobsObserved } from 'mongoDB/lib/jobsObserved';
import { UpdateResult } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userID = req.query.userID;
  let result: UpdateResult | undefined;
  if (!userID || typeof userID !== 'string')
    return res.status(400).send(getResMessage('USER_ID_NOT_VALID'));

  //POST request to /api/users/<userID>/observed
  if (req.method === 'POST') {
    const jobID = req.body.jobID;
    if (!jobID || typeof jobID !== 'string')
      return res.status(400).send(getResMessage('JOB_ID_IS_NOT_VALID'));
    result = await addToJobsObserved(userID, jobID);

    //In case when the jobs observed is created.
    if (result?.modifiedCount) return res.status(201).send(getResMessage('JOBS_OBSERVED_CREATED'));

    //In case when there is no change in jobs observed data.
    if (result?.matchedCount) return res.status(204).send(getResMessage('JOBS_OBSERVED_NOT_CREATED'));
    return res.status(400).send(getResMessage('JOBS_OBSERVED_NOT_CREATED'));
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
