/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserProfile, UserProfileWithOneUserQuery } from '@/lib/types/user.types';
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

//Create a new userProfile and userQuery data by the provided userData.
const createNewUserData = (userData: UserProfileWithOneUserQuery) => {
  const { userQuery, activeHash, ...restUserData } = userData;
  const { hash, numResultsFound, numMatches, ...restUserQuery } = userQuery;
  return {
    userProfile: {
      ...restUserData,
      activeHash: null
    },
    userQuery: {
      ...restUserQuery,
      numMatches: 0,
      numResultsFound: 0,
      updatedAt: new Date()
    }
  };
};
//Create pipeline for adding new user query.
const addUserQueryPipelines = (newUserData: ReturnType<typeof createNewUserData>) => {
  const { userProfile, userQuery } = newUserData;
  return [
    {
      $set: {
        ...userProfile,
        activeHash: null
      },

      $addToSet: {
        userQueries: userQuery
      }
    },
    {
      upsert: true
    }
  ];
};
//Create pipeline for updating an exist user query.
const updateUserQueryPipelines = (newUserData: ReturnType<typeof createNewUserData>, hash: string) => {
  const { userProfile, userQuery } = newUserData;
  return [
    {
      $set: {
        ...userProfile,
        activeHash: null,
        'userQueries.$[userQuery]': userQuery
      }
    },
    {
      arrayFilters: [
        {
          'userQuery.hash': hash
        }
      ]
    }
  ];
};

// Update user profile and add new query or edit exist query.
export const updateUser = async (userData: UserProfileWithOneUserQuery) => {
  const users = await getCollection('users');

  const newUserData = createNewUserData(userData);
  const pipelines = userData.userQuery.hash
    ? updateUserQueryPipelines(newUserData, userData.userQuery.hash)
    : addUserQueryPipelines(newUserData);
  try {
    const res = await users.updateOne(
      {
        userID: userData.userID
      },
      pipelines[0],
      pipelines[1]
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
