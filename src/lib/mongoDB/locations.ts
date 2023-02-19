import clientPromise from './mongoDB';

export const getLocations = async (name: string) => {
  const client = await clientPromise;

  try {
    const db = client.db('jobs-agent-db');
    const locations = db.collection('locations');
    console.log(name);
    const regex = new RegExp(`^${name}`);
    const res = locations
      .find({
        locationName: regex
      })
      .limit(20)
      .sort({
        locationName: 1
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
