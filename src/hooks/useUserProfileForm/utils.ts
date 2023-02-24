import { Requirements, UserProfileWithOneUserQuery, UserQuery } from '@/lib/types/api.types';
import { GenericRecord } from '@/lib/types/types';

import { MinMaxInputsOption } from '../../components/UserProfileForm/Requirements/MinMaxInputs';
import { UserQueryTransform } from './types';

/**
 * @param {MinMaxInputsOption[]} minMaxValues The values of minMax inputs.
 * @returns {Requirements} The transform values of minMax inputs as requirements format.
 */
export function transformRequirements(minMaxValues: MinMaxInputsOption[]): Requirements {
  const requirements: Requirements = {};
  for (const minMaxValue of minMaxValues) {
    requirements[minMaxValue.field] = {
      min: minMaxValue.min,
      max: minMaxValue.max
    };
  }
  return requirements;
}
/**
 *  @param {string[]} inputBucketValues The values of inputBucket.
 * @returns {GenericRecord<boolean>} The transform values of inputBucket as excludedRequirements format.
 */
export function transformExcludedRequirements(inputBucketValues: string[]): GenericRecord<boolean> {
  const excludedRequirement: GenericRecord<boolean> = {};
  for (const value of inputBucketValues) {
    excludedRequirement[value] = true;
  }
  return excludedRequirement;
}

/**
 * @param {Requirements} requirements The requirements object from the DB.
 * @returns { MinMaxInputsOption[]} The transform values of requirements as MinMaxInputsOption[]
 */
export function transformRequirementsDefaultValues(requirements: Requirements): MinMaxInputsOption[] {
  const requirementsEntries = Object.entries(requirements);
  const minMaxSelectOptions = requirementsEntries.map(([key, value]) => ({
    field: key,
    min: value?.min || 0,
    max: value?.max || 1
  }));
  return minMaxSelectOptions;
}

/**
 * @param {GenericRecord<boolean>} excludedRequirements The excludedRequirements object from the DB.
 * @returns { string[]} The transform values of excludedRequirements as string[]
 */

export function transformExcludedRequirementsDefaultValues(
  excludedRequirements: GenericRecord<boolean>
): string[] {
  const requirementsEntries = Object.keys(excludedRequirements);
  const minMaxSelectOptions = requirementsEntries.map((key) => key);
  return minMaxSelectOptions;
}

/**
 * @param {UserQuery} userQuery The userQuery object from the DB.
 * @returns {UserQueryTransform} The transform values of userQuery as UserQueryTransform
 */
export function transformUserQuery(userQuery: UserQuery): UserQueryTransform {
  const transformUserQuery: GenericRecord<string | string[]> = {};
  for (const [key, value] of Object.entries(userQuery)) {
    const joinValue = value?.split(',');
    transformUserQuery[key] = joinValue;
  }
  return transformUserQuery as UserQueryTransform;
}

/**
 *  This function enables the form use the values from the DB as inputs' default values.
 */
export const transformDefaultFormValues = ({
  requirements,
  excludedRequirements,
  userQuery,
  ...formValues
}: UserProfileWithOneUserQuery) => {
  return {
    ...formValues,
    requirements: transformRequirementsDefaultValues(requirements),
    excludedRequirements: transformExcludedRequirementsDefaultValues(excludedRequirements),
    userQuery: transformUserQuery(userQuery)
  };
};
