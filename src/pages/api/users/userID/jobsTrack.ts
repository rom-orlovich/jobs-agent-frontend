import { Job } from '@/lib/jobsScanner.types';
import { MESSAGES, MESSAGE_CODES } from '@/lib/messages';
import { addJobTrack } from 'mongoDB/handlers';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //   const jobTrackItem = req.body;
  const userID = String(req.query.userID);

  const jobData = req.body as Job;
  if (req.method === 'POST') {
    if (!userID)
      return res.status(400).send({
        message: MESSAGES[MESSAGE_CODES.ENTER_VALID_QUERY]
      });

    const result = await addJobTrack(userID, jobData);
    if (result?.modifiedCount)
      return res.status(201).send({
        message: MESSAGES[MESSAGE_CODES.TRACK_JOB_CREATED]
      });
    else {
      return res.status(400).send({
        message: MESSAGES[MESSAGE_CODES.TRACK_JOB_NOT_CREATED]
      });
    }
  }
  if (req.method === 'PUT') {
    return res.status(404).send({
      message: MESSAGES[MESSAGE_CODES.FOUNDED]
    });
  }
}
