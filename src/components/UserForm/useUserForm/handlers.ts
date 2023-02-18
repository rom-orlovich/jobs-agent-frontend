import { MinMaxSelectOption } from '@/components/Profile/MinMaxSelect';
import { GenericRecord } from '@/lib/type';

import { requirements } from '../userForm';
export const handleRequirements = (minMaxValues: MinMaxSelectOption[]) => {
  const minMaxValuesObj: requirements = {};
  for (const minMaxValue of minMaxValues) {
    minMaxValuesObj[minMaxValue.title] = {
      min: minMaxValue.min,
      max: minMaxValue.max
    };
  }
  return minMaxValuesObj;
};
export const handleExcludedRequirements = (values: string[]) => {
  const excludedRequirement: GenericRecord<boolean> = {};
  for (const value of values) {
    excludedRequirement[value] = true;
  }
  return excludedRequirement;
};
