import { MinMaxSelectOption } from '@/components/Profile/MinMaxSelect';
import { GenericRecord, OmitKey } from '@/lib/type';

export const handleMinMaxValuesTransform = (minMaxValues: MinMaxSelectOption[]) => {
  const minMaxValuesObj: GenericRecord<OmitKey<MinMaxSelectOption, 'title'>> = {};
  for (const minMaxValue of minMaxValues) {
    minMaxValuesObj[minMaxValue.title] = {
      min: minMaxValue.min,
      max: minMaxValue.max
    };
  }
  return minMaxValuesObj;
};
