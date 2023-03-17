import { Job } from '@/lib/types/jobsScanner.types';
import { getCollection } from './utils';

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
              statusCV: {
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
