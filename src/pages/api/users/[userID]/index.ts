import { getResMessage } from '@/lib/utils';
import { updateUser, getUserByID } from 'mongoDB/lib/handlers';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const userID = req.query.userID;

    const result = await updateUser({
      userID,
      ...req.body
    });
    if (result?.acknowledged) return res.status(201).send(getResMessage('USER_ID_UPDATED'));

    return res.status(404).send(getResMessage('USER_NOT_FOUND'));
  }

  if (req.method === 'GET') {
    if (typeof req?.query?.userID !== 'string')
      return res.status(400).send(getResMessage('ENTER_VALID_QUERY'));

    const user = await getUserByID(req.query.userID);

    if (user)
      return res.status(200).send({
        ...getResMessage('USER_IS_FOUND'),
        data: user
      });

    return res.status(404).send(getResMessage('USER_NOT_FOUND'));
  }
}
