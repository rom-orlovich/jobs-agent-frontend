/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserProfile, UserProfileWithOneUserQuery } from '@/lib/types/api.types';
import { getCollection } from './utils';
export const getUserByID = async (userID: string) => {
  const users = await getCollection('users');

  try {
    const res = await users.findOne<UserProfile>(
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

// Update user profile and add new query to his userQueries data.
export const updateUser = async (userData: UserProfileWithOneUserQuery) => {
  const users = await getCollection('users');
  const { userQuery, activeHash, ...restUserData } = userData;

  const { hash, numResultsFound, numMatches, ...restUserQuery } = userQuery;

  try {
    const res = await users.updateOne(
      {
        userID: userData.userID
      },
      {
        $set: {
          ...restUserData,
          activeHash: null
        },
        //Add new user's query.
        $addToSet: {
          userQueries: {
            ...restUserQuery,
            numMatches: 0,
            numResultsFound: 0,
            createdAt: new Date()
          }
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

export const deleteUserQuery = async (userID: string, hash: string) => {
  try {
    const users = await getCollection('users');
    const result = await users.updateOne(
      {
        userID: userID
      },
      {
        $pull: {
          userQueries: {
            hash: hash
          }
        }
      }
    );
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
