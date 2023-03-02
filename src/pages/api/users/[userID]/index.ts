import { MESSAGES, MESSAGE_CODES } from '@/lib/messages';
import { updateUser, getUserByID } from 'mongoDB/lib/handlers';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const userID = req.query.userID;
    const result = await updateUser({
      userID,
      ...req.body
    });
    if (result?.acknowledged)
      return res.status(201).send({
        message: MESSAGES[MESSAGE_CODES.USER_ID_UPDATED],
        code: MESSAGE_CODES.USER_ID_UPDATED
      });

    return res.status(404).send({
      message: MESSAGES[MESSAGE_CODES.USER_NOT_FOUND],
      code: MESSAGE_CODES.USER_NOT_FOUND
    });
  }

  if (req.method === 'GET') {
    if (typeof req?.query?.userID !== 'string')
      return res.status(400).send({
        message: MESSAGES[MESSAGE_CODES.ENTER_VALID_QUERY],
        code: MESSAGE_CODES.ENTER_VALID_QUERY
      });

    const user = await getUserByID(req.query.userID);

    if (user)
      return res.status(200).send({
        message: MESSAGES[MESSAGE_CODES.USER_IS_FOUND],
        data: user,
        code: MESSAGE_CODES.USER_IS_FOUND
      });

    return res.status(404).send({
      message: MESSAGES[MESSAGE_CODES.USER_NOT_FOUND],
      code: MESSAGE_CODES.USER_NOT_FOUND
    });
  }
}
