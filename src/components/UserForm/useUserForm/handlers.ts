import { GenericRecord } from '@/lib/type';
import { Requirements, UserOptions, UserQuery, UserQueryTransform } from '@/lib/user';
import { MinMaxInputsOption } from '../Profile/MinMaxSelect';

export const handleRequirements = (minMaxValues: MinMaxInputsOption[]) => {
  const minMaxValuesObj: Requirements = {};
  for (const minMaxValue of minMaxValues) {
    minMaxValuesObj[minMaxValue.field] = {
      min: minMaxValue.min,
      max: minMaxValue.max
    };
  }
  return minMaxValuesObj;
};
export const handleExcludedRequirements = (inputBucketValues: string[]) => {
  const excludedRequirement: GenericRecord<boolean> = {};
  for (const value of inputBucketValues) {
    excludedRequirement[value] = true;
  }
  return excludedRequirement;
};

export const handleRequirementsTransformDefaultValues = (
  requirements: Requirements
): MinMaxInputsOption[] => {
  const requirementsEntries = Object.entries(requirements);
  const minMaxSelectOptions = requirementsEntries.map(([key, value]) => ({
    field: key,
    min: value?.min || 0,
    max: value?.max || 1
  }));
  return minMaxSelectOptions;
};
export const handleExcludedRequirementsTransformDefaultValues = (
  excludedRequirements: GenericRecord<boolean>
): string[] => {
  const requirementsEntries = Object.keys(excludedRequirements);
  const minMaxSelectOptions = requirementsEntries.map((key) => key);
  return minMaxSelectOptions;
};

export const transformUserQuery = (userQuery: UserQuery) => {
  const transformUserQuery: GenericRecord<string | string[]> = {};
  for (const [key, value] of Object.entries(userQuery)) {
    const joinValue = value?.split(',');
    transformUserQuery[key] = joinValue;
  }
  return transformUserQuery as UserQueryTransform;
};

export const transformDefaultFormValues = ({
  requirements,
  excludedRequirements,
  userQuery,
  ...formValues
}: UserOptions) => {
  return {
    ...formValues,
    requirements: handleRequirementsTransformDefaultValues(requirements),
    excludedRequirements: handleExcludedRequirementsTransformDefaultValues(excludedRequirements),
    userQuery: transformUserQuery(userQuery)
  };
};
