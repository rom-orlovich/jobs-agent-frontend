import { createUser } from '@/lib/mongoDB/users';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handleAddProfile(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log(req.body);
    const userID = req.query.userID;
    const result = await createUser({
      userID,
      ...req.body
    });

    if (result?.acknowledged) {
      return res.status(201).send({
        message: 'The user is created successfully'
      });
    } else
      return res.status(404).send({
        message: 'The user is not created'
      });
  }
}
