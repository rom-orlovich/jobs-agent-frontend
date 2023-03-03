import { UserQuery } from '@/lib/types/api.types';
import { GenericRecord } from '@/lib/types/types';
import { Option } from '../Inputs/SelectInput/selectInput.types';

export const sortUserHistoryQueries = (userHistoryQueries: UserQuery[]) => {
  const getTime = (createdAt?: string) => new Date(createdAt || '').getTime();

  const sortHistoryQueries = userHistoryQueries
    .slice()
    .sort((a, b) => getTime(b.createdAt) - getTime(a.createdAt));
  return sortHistoryQueries;
};

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
