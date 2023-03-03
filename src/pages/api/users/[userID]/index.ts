import { getResMessage } from '@/lib/utils';
import { updateUser, getUserByID, deleteUserQuery } from 'mongoDB/lib/users';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let result;

  //GET request to /api/users/<userID>/
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
    //In case no user is found.
    return res.status(404).send(getResMessage('USER_NOT_FOUND'));
  }

  //POST request to /api/users/<userID>/
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
    if (result?.acknowledged) return res.status(201).send(getResMessage('USER_IS_UPDATED'));

    //In case the conditions above are false.
    return res.status(404).send(getResMessage('USER_NOT_FOUND'));
  }

  const hash = req.query.hash;
  //DELETE request to /api/users/<userID>/ - Delete user's query.
  if (req.method === 'DELETE' && hash) {
    const userID = req.query.userID;

    //Check if the userID is string.
    if (typeof hash !== 'string' || typeof userID !== 'string')
      return res.status(400).send(getResMessage('ENTER_VALID_QUERY'));

    //Delete the user query.
    result = await deleteUserQuery(userID, hash);

    //In case the user query's is delete.
    if (result?.acknowledged) return res.status(201).send(getResMessage('USER_IS_UPDATED'));

    //In case the conditions above are false.
    return res.status(404).send(getResMessage('USER_NOT_FOUND'));
  }
}
