import { MESSAGES, MESSAGE_CODES } from '@/lib/messages';
import { getLocations } from 'mongoDB/lib/handlers';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const locations = await getLocations(String(req.query.name));

    return res.status(200).send({
      data: locations,
      message: MESSAGES[MESSAGE_CODES.FOUNDED],
      code: MESSAGE_CODES.FOUNDED
    });
  } catch (error) {
    // Console.log(error);
    return res.status(500).send({
      data: undefined,
      message: MESSAGES[MESSAGE_CODES.SOMETHING_WRONG],
      code: MESSAGE_CODES.SOMETHING_WRONG
    });
  }
}
