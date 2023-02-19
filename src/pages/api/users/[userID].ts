import { createUser, getUserByID } from '@/lib/mongoDB/users';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const userID = req.query.userID;
    const result = await createUser({
      userID,
      ...req.body
    });
    console.log('post', result);

    if (result?.acknowledged) {
      return res.status(201).send({
        message: 'The user is created successfully'
      });
    } else
      return res.status(404).send({
        message: 'The user is not created'
      });
  }

  if (req.method === 'GET') {
    if (typeof req?.query?.userID !== 'string')
      return res.status(400).send({
        message: 'enter valid query parameters'
      });
    const user = await getUserByID(req.query.userID);

    if (user) {
      return res.status(201).send({
        message: 'The user is was found',
        data: user
      });
    } else
      return res.status(404).send({
        message: 'The user is not found'
      });
  }
}
