/* eslint-disable @typescript-eslint/no-unused-vars */
import { Job, TrackInfo } from '@/lib/jobsScanner.types';
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
export const addJobTrack = async (userID: string, job: Job) => {
  try {
    const users = await getCollection('users');
    const res = await users.updateOne(
      {
        userID
      },
      {
        $addToSet: {
          jobsTrack: {
            ...job,
            track: {
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

export const updateJobTrack = async (userID: string, job: Job) => {
  try {
    const users = await getCollection('users');
    const res = await users.updateOne(
      {
        userID
      },
      {
        $set: {
          'jobsTrack.$[elem].track': job.track
        }
      },
      {
        arrayFilters: [
          {
            'jobsTrack.jobID': job.jobID
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
export const deleteJobTrack = async (userID: string, jobID: string) => {
  const users = await getCollection('users');

  console.log(userID);

  try {
    const res = await users.updateOne(
      {
        userID
      },
      {
        $pull: {
          jobsTrack: {
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
