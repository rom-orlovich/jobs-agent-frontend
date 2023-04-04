import { getCollection } from './utils';

export const addToJobsObserved = async (userID: string, jobID: string) => {
  const jobsObserved = await getCollection('users');
  try {
    const result = await jobsObserved.updateOne(
      {
        userID
      },
      {
        $addToSet: {
          jobsObserved: jobID
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
