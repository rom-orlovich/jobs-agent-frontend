import { UserOptions } from '../user';
import clientPromise from './mongoDB';

export const createUser = async (userData: UserOptions) => {
  const jobsDB = (await clientPromise).db('jobs-agent-db');
  const users = jobsDB.collection('users');

  try {
    const res = await users.updateOne(
      {
        userID: userData.userID
      },
      {
        $set: {
          ...userData
        }
      },
      {
        upsert: true
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const getUserByID = async (userID: string) => {
  const jobsDB = (await clientPromise).db('jobs-agent-db');
  const users = jobsDB.collection('users');

  try {
    const res = await users.findOne<UserOptions>(
      {
        userID: userID
      },
      {
        projection: {
          _id: false
        }
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
