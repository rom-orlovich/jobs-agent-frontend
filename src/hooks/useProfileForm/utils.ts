import { Requirements, UserProfileWithOneUserQuery, UserQuery } from '@/lib/types/user.types';
import { GenericRecord } from '@/lib/types/types';

import { MinMaxInputsOption } from '../../components/UserProfileForm/Requirements/MinMaxInputs';
import { UserQueryTransform, YearsExperienceObjWordsNumKeys } from './types';

export const YEARS_EXPERIENCE_WORDS_NUM = {
  'שנה אחת': '1',
  שנתיים: '2',
  'שלוש שנים': '3',
  'ארבע שנים': '4',
  'חמש שנים': '5',
  'שש שנים ומעלה': '8' //Max years experience in jobs listing sites.
};

export const YEARS_EXPERIENCE_WORDS = Object.keys(
  YEARS_EXPERIENCE_WORDS_NUM
) as YearsExperienceObjWordsNumKeys[];

/**
 * @param {string} overallExWords Words of years experience.
 * @returns {string} The num that represent the years in number.
 */

export const getOverallExYearNum = (overallExWords: string): string =>
  YEARS_EXPERIENCE_WORDS_NUM[overallExWords as YearsExperienceObjWordsNumKeys];

/**
 * @param {string} overallExNum Num of years experience.
 * @returns {string} The words that represent the years in words.
 */
export const getOverallExYearWords = (overallExNum: string): string =>
  YEARS_EXPERIENCE_WORDS[Number(overallExNum) - 1];

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
    if (key === 'location' || key === 'position') transformUserQuery[key] = value;
    else if (typeof value === 'string') {
      const joinValue = value?.split(',');
      transformUserQuery[key] = joinValue;
    }
  }
  return transformUserQuery as UserQueryTransform;
}

/**
 *  This function enables the form to use the values from the DB as valid inputs' default values.
 */
export const transformDefaultFormValues = ({
  requirements,
  excludedRequirements,
  userQuery,
  overallEx,
  ...formValues
}: UserProfileWithOneUserQuery) => {
  //Convert the num years experience to words.
  const curOverallEx = getOverallExYearWords(overallEx || '');

  return {
    ...formValues,
    //If the overallEx is not valid number in YEARS_EXPERIENCE_WORDS
    // (it happens when the input's value changes and doesn't match any keys in YEARS_EXPERIENCE_WORDS),so uses the input's value itself as current raw value.
    overallEx: curOverallEx ? curOverallEx : overallEx,
    requirements: transformRequirementsDefaultValues(requirements),
    excludedRequirements: transformExcludedRequirementsDefaultValues(excludedRequirements),
    userQuery: transformUserQuery(userQuery)
  };
};
