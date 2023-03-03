import { UserQuery } from '@/lib/types/api.types';
import { GenericRecord } from '@/lib/types/types';
import { Option } from '../Inputs/SelectInput/selectInput.types';

/**
 *
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