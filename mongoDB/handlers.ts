import { UserOptions } from '@/lib/types/api.types';
import { getCollection, getDocumentsByName } from './lib/utils';
export const getLocations = async (name: string) => {
  const locationsDocs = await getDocumentsByName(name, 'locations', 'locationName');
  return locationsDocs;
};

export const getPositions = async (name: string) => {
  const positionsDocs = await getDocumentsByName(name, 'positions', 'positionName');
  return positionsDocs;
};

export const createUser = async (userData: UserOptions) => {
  const users = await getCollection('users');

  try {
    const res = await users.updateOne(
      {
        userID: userData.userID
      },
      {
        $set: userData
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
  const users = await getCollection('users');

  try {
    const res = await users.findOne<UserOptions>(
      {
        userID: userID
      },
      {
        projection: {
          _id: false,
          hashQueries: false
        }
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
