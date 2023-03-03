import { getResMessage } from '@/lib/utils';
import { getLocations } from 'mongoDB/lib/handlers';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET request /api/locations
  try {
    const locations = await getLocations(String(req.query.name));
    //In case the locations are founded.
    return res.status(200).send({
      data: locations,
      ...getResMessage('FOUNDED')
    });
  } catch (error) {
    //In case there is an error.
    console.log(error);
    return res.status(500).send({
      data: undefined,
      ...getResMessage('SOMETHING_WRONG')
    });
  }
}
