import { HistoryQueriesFiltersFields } from '@/hooks/useFiltersHooks/useHistoryQueriesFilters';
import { UserQuery } from '@/lib/types/user.types';
import { GenericRecord } from '@/lib/types/types';
import { Option } from '../Inputs/SelectInput/selectInput.types';

/**
 *
 * @param {HistoryQueriesFiltersFields} filterValues The current user's history search queries filters values fields
 * @param {UserQuery[]} userQueries The current user's history search queries that suppose to be filtered
 * @returns {UserQuery[]} The current user's history search queries filter by filter values fields.
 */

export const filterHistoryQueries = (
  userQueries: UserQuery[],
  filterValues: HistoryQueriesFiltersFields
) => {
  const { afterUpdateDate, location, position } = filterValues;
  let currentUserQueries = userQueries.filter((userQuery) => userQuery.hash);

  if (position)
    currentUserQueries = currentUserQueries?.filter((userQuery) =>
      userQuery.position.toLowerCase().includes(position.toLowerCase())
    );
  if (location)
    currentUserQueries = currentUserQueries?.filter((userQuery) =>
      userQuery.location.toLowerCase().includes(location.toLowerCase())
    );
  if (afterUpdateDate)
    currentUserQueries = currentUserQueries?.filter(
      (userQuery) =>
        new Date(userQuery.createdAt as unknown as string).getTime() >=
        new Date(afterUpdateDate).getTime()
    );

  return currentUserQueries;
};

/**
 * @param {UserQuery[]} userQueries The current user's history search queries
 * @returns { {locations:string[],positions:string[]}} An object of unique string arrays of locations and positions of all the user's history search queries.
 */
export const createHistoryQueriesFiltersArrValues = (userQueries: UserQuery[]) => {
  const positions: Set<string> = new Set([]);
  const locations: Set<string> = new Set([]);
  userQueries?.forEach((userQuery) => {
    if (userQuery.position) positions.add(userQuery.position);
    if (userQuery.location) locations.add(userQuery.location);
  });

  return {
    positions: [...positions],
    locations: [...locations]
  };
};

/**
 * @param {UserQuery[]} userQueries The current user's history search queries.
 * @returns {UserQuery[]} The current sorted user's history search queries array by updated date.
 */
export const sortUserHistoryQueries = (userQueries: UserQuery[]): UserQuery[] => {
  const getTime = (createdAt?: string) => new Date(createdAt || '').getTime();

  const sortHistoryQueries = userQueries
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
