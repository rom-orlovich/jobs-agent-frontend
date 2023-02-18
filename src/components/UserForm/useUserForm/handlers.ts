import { MinMaxSelectOption } from '@/components/Profile/MinMaxSelect';

import { RequirementsOptions } from '../userForm';
export const handleMinMaxValuesTransform = (minMaxValues: MinMaxSelectOption[]) => {
  const minMaxValuesObj: RequirementsOptions = {};
  for (const minMaxValue of minMaxValues) {
    minMaxValuesObj[minMaxValue.title] = {
      min: minMaxValue.min,
      max: minMaxValue.max
    };
  }
  return minMaxValuesObj;
};
