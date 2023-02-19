import clientPromise from './mongoDB';

export const getPositions = async (name: string) => {
  const client = await clientPromise;

  try {
    const db = client.db('jobs-agent-db');
    const position = db.collection('positions');

    const regex = new RegExp(`^${name}`);
    const res = position
      .find({
        positionName: regex
      })
      .limit(20)
      .sort({
        positionName: 1
      });

    const data = await res.toArray();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
  {
  }
};
