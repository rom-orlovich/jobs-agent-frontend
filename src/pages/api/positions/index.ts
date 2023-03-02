import { MESSAGES, MESSAGE_CODES } from '@/lib/messages';
import { getPositions } from 'mongoDB/lib/handlers';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const position = await getPositions(String(req.query.name));
    return res.status(200).send({
      data: position,
      message: MESSAGES[MESSAGE_CODES.FOUNDED],
      code: MESSAGE_CODES.FOUNDED
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      data: undefined,
      message: MESSAGES[MESSAGE_CODES.SOMETHING_WRONG],
      code: MESSAGE_CODES.SOMETHING_WRONG
    });
  }
}
