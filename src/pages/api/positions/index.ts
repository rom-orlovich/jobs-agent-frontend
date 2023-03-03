import { getPositions } from 'mongoDB/lib/handlers';
import { getResMessage } from '@/lib/utils';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET request /api/positions
  try {
    const position = await getPositions(String(req.query.name));
    //In case the positions are founded.
    return res.status(200).send({
      data: position,
      ...getResMessage('FOUNDED')
    });
  } catch (error) {
    console.log(error);
    //In case there is an error.
    return res.status(500).send({
      data: undefined,
      ...getResMessage('SOMETHING_WRONG')
    });
  }
}
