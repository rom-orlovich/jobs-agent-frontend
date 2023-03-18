import { HistoryQueriesFiltersFields } from '@/hooks/useFiltersHooks/useHistoryQueriesFilters';
import { UserQuery } from '@/lib/types/api.types';
import { GenericRecord } from '@/lib/types/types';
import { Option } from '../Inputs/SelectInput/selectInput.types';

/**
 *
 * @param {HistoryQueriesFiltersFields} filterValues The current jobs tracking's filter values fields
 * @param {UserQuery[]} userQueries The current userQueries that suppose to be filtered
 * @returns {UserQuery[]} The current userQueries filter by filter values fields.
 */
export const filterHistoryQueries = (
  userQueries: UserQuery[],
  filterValues: HistoryQueriesFiltersFields
) => {
  const { afterUpdateDate, location, position } = filterValues;

  return userQueries?.filter((userQuery) => {
    if (position) return userQuery.position.toLowerCase().includes(position.toLowerCase());

    if (location) return userQuery.location.toLowerCase().includes(location.toLowerCase());
    if (afterUpdateDate)
      return (
        new Date(userQuery?.createdAt as unknown as string).getTime() >=
        new Date(afterUpdateDate).getTime()
      );
    return userQuery.hash;
  });
};
// export const filtersJobsTracking = (filterValues: JobsTrackingFiltersFields, jobs?: Job[]) => {
//   let currentJobs = jobs;
//   const { title, CVwasSent, afterUpdateDate, currentStageName } = filterValues;

//   if (title)
//     currentJobs = currentJobs?.filter((jobs) => jobs.title.toLowerCase().includes(title.toLowerCase()));
//   if (CVwasSent) currentJobs = currentJobs?.filter((jobs) => jobs.info?.statusCV?.wasSent);
//   if (afterUpdateDate)
//     currentJobs = currentJobs?.filter(
//       (jobs) =>
//         new Date(jobs.info?.createdAt as unknown as string).getTime() >=
//         new Date(afterUpdateDate).getTime()
//     );
//   if (currentStageName)
//     currentJobs = currentJobs?.filter((jobs) =>
//       jobs.info?.stages.at(-1)?.name.toLowerCase().includes(currentStageName.toLowerCase())
//     );
//   return currentJobs;
// };

export const createHistoryQueriesFiltersArrValues = (userQueries: UserQuery[]) => {
  const positions: Map<string, Option<string>> = new Map([]);
  const locations: Map<string, Option<string>> = new Map([]);
  userQueries?.forEach((userQuery, i) => {
    if (userQuery.position)
      positions.set(userQuery.position, {
        title: userQuery.position,
        value: userQuery.position,
        id: userQuery.hash + '' + i
      });
    if (userQuery.location)
      locations.set(userQuery.location, {
        title: userQuery.location,
        value: userQuery.location,
        id: userQuery.hash + '' + i
      });
  });

  return {
    positions: [...positions.values()],
    locations: [...locations.values()]
  };
};

/**
 * @param {UserQuery[]} userHistoryQueries User's search query array.
 * @returns {UserQuery[]} Sorted user's search query array by created date.
 */
export const sortUserHistoryQueries = (userHistoryQueries: UserQuery[]): UserQuery[] => {
  const getTime = (createdAt?: string) => new Date(createdAt || '').getTime();

  const sortHistoryQueries = userHistoryQueries
    .slice()
    .sort((a, b) => getTime(b.createdAt) - getTime(a.createdAt));
  return sortHistoryQueries;
};

/**
 * @param {string} value Category's values of user's search query.
 * @param {Option<string>[]} options List of the options for the specific category.
 * @returns {string} The actual text of this category's value.
 */

export const handleConvertUserQueryToText = (value: string, options: Option<string>[]): string => {
  const splitString = value.split(',');
  const valueObj: GenericRecord<string> = {};
  splitString.forEach((value) => (valueObj[value] = value));

  const realTextArr: string[] = [];
  options.forEach((option) => {
    if (valueObj[option.id]) {
      realTextArr.push(option.title);
    }
  });
  return realTextArr.join(', ');
};
