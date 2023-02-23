import { UserProfile, UserProfileWithOneUserQuery } from '@/lib/types/api.types';
// import { JobsPosts } from './lib/types';
import { getCollection, getDocumentsByName } from './lib/utils';
export const getLocations = async (name: string) => {
  const locationsDocs = await getDocumentsByName(name, 'locations', 'locationName');
  return locationsDocs;
};

export const getPositions = async (name: string) => {
  const positionsDocs = await getDocumentsByName(name, 'positions', 'positionName');
  return positionsDocs;
};

export const updateUser = async (userData: UserProfileWithOneUserQuery) => {
  const users = await getCollection('users');
  const { userQuery, ...restUserData } = userData;
  try {
    const res = await users.updateOne(
      {
        userID: userData.userID
      },
      {
        $set: restUserData,
        $addToSet: {
          userQueries: {
            ...userQuery,
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

// export const getJobsPostsByTitle = async (name: string, hash: string, page = 1, limit = 20) => {
//   const jobsDocs = await getDocumentsByName<JobsPosts>(name, 'jobs', 'title', page, limit);
//   return jobsDocs;
// };
