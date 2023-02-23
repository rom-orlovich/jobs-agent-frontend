import { updateUser, getUserByID } from 'mongoDB/handlers';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const userID = req.query.userID;
    const result = await updateUser({
      userID,
      ...req.body
    });
    console.log('post', result);

    if (result?.acknowledged)
      return res.status(201).send({
        message: 'המשתמש עודכן בהצלחה!'
      });

    return res.status(404).send({
      message: ' :( לא הצלחנו למצוא את המשתמש'
    });
  }

  if (req.method === 'GET') {
    if (typeof req?.query?.userID !== 'string')
      return res.status(400).send({
        message: 'הכנס פרמטרים חוקיים!'
      });

    const user = await getUserByID(req.query.userID);

    if (user)
      return res.status(201).send({
        message: ' :( לא הצלחנו למצוא את המשתמש',
        data: user
      });

    return res.status(404).send({
      message: ' :( לא הצלחנו למצוא את המשתמש'
    });
  }
}
