import { getLocations } from '@/lib/mongoDB/locations';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handleLocations(req: NextApiRequest, res: NextApiResponse) {
  try {
    const locations = await getLocations(String(req.query.name));

    return res.status(200).send({
      data: locations,
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
