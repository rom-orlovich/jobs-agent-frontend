/* eslint-disable @typescript-eslint/no-unused-vars */
import { Job } from '@/lib/jobsScanner.types';
import { UserProfile, UserProfileWithOneUserQuery } from '@/lib/types/api.types';

import { getCollection, getDocumentsByName } from './utils';

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
  const { userQuery, activeHash, ...restUserData } = userData;

  const { hash, numResultFound, numMatches, ...restUserQuery } = userQuery;

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
        $addToSet: {
          userQueries: {
            ...restUserQuery,
            numMatches: 0,
            numResultFound: 0,
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
export const addJobTracking = async (userID: string, job: Job) => {
  try {
    const users = await getCollection('users');
    const res = await users.updateOne(
      {
        userID
      },
      {
        $addToSet: {
          tracking: {
            ...job,
            info: {
              createdAt: new Date(),
              sendCV: {
                date: new Date(),
                status: false
              },
              stages: []
            }
          }
        }
      }
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const updateJobTracking = async (userID: string, job: Job) => {
  try {
    const users = await getCollection('users');
    const res = await users.updateOne(
      {
        userID
      },
      {
        $set: {
          'tracking.$[jobs].info': job.info
        }
      },
      {
        arrayFilters: [
          {
            'jobs.jobID': job.jobID
          }
        ]
      }
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
export const deleteJobTracking = async (userID: string, jobID: string) => {
  const users = await getCollection('users');

  console.log(userID);

  try {
    const res = await users.updateOne(
      {
        userID
      },
      {
        $pull: {
          tracking: {
            jobID: jobID
          }
        }
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
