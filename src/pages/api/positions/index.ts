import { getPositions } from 'mongoDB/handlers';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const position = await getPositions(String(req.query.name));
    return res.status(200).send({
      data: position,
      message: 'Success!'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: 'Something went wrong',
      data: undefined
    });
  }
}
