import { getResMessage } from '@/lib/utils';
import { updateUser, getUserByID } from 'mongoDB/lib/handlers';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //POST request to /api/users/<userID>/

  let result;
  if (req.method === 'POST') {
    const userID = req.query.userID;

    //Check if the userID is string.
    if (typeof req?.query?.userID !== 'string')
      return res.status(400).send(getResMessage('ENTER_VALID_QUERY'));

    //Update the user.
    result = await updateUser({
      userID,
      ...req.body
    });

    //In case the user is updated.
    if (result?.acknowledged) return res.status(201).send(getResMessage('USER_ID_UPDATED'));

    //In case the conditions above are false.
    return res.status(404).send(getResMessage('USER_NOT_FOUND'));
  }
  //Get request to /api/users/<userID>/
  if (req.method === 'GET') {
    //Check if the userID is string.
    if (typeof req?.query?.userID !== 'string')
      return res.status(400).send(getResMessage('ENTER_VALID_QUERY'));

    //Get user.
    const result = await getUserByID(req.query.userID);

    //In case the user is found
    if (result)
      return res.status(200).send({
        ...getResMessage('USER_IS_FOUND'),
        data: result
      });

    return res.status(404).send(getResMessage('USER_NOT_FOUND'));
  }
}
