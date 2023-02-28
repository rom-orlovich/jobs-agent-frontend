import { UseDownloadHooksProps } from '@/hooks/useDownloadController';
import { UseScannerHooksProps } from '@/hooks/useScannerController';
import { UserQuery } from '@/lib/types/api.types';
import { GenericRecord } from '@/lib/types/types';
import {
  DISTANCE_OPTIONS,
  EXPERIENCE_OPTIONS,
  JOB_TYPES_OPTIONS,
  SCOPES_OPTIONS
} from '@/lib/userQueryOptions';
import React from 'react';
import { AiTwotoneEdit } from 'react-icons/ai';
import { TriggerByHash } from '../Buttons/Button.types';

import DownloadButton from '../Buttons/DownloadButton';

import SearchButton from '../Buttons/SearchButton';
import Field from '../Field/Field';
import { Option } from '../Inputs/SelectInput/selectInput.types';

/**
 *
 * @param {string} value Category's values of user's search query.
 * @param {Option<string>[]} options List of the options for the specific category.
 * @returns {string} The actual text of this category's value.
 */
const handleConvertUserQueryToText = (value: string, options: Option<string>[]): string => {
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
const searchItemStyle = {
  item: 'bg-white shadow-lg rounded-md flex flex-col border-none max-w-[80%] flex-[50%] p-[1.5rem] gap-3',
  editButtonContainer: 'flex justify-end pl-2',
  editButton: 'text-adding-500 hover:text-adding-600 text-3xl',
  fieldsContainer: 'flex gap-2 flex-row',
  fieldItemContainer: 'flex xs:flex-row flex-col gap-1',
  title: 'font-bold',

  buttonsContainer: 'flex md:justify-end justify-between xs:gap-8',
  download: ''
};

function SearchItem({
  distance,
  experience,
  jobType,
  location,
  position,
  scope,
  createdAt,
  hash,
  downloadState,
  numResultFound,
  numMatches,
  handleEditButton,
  scanner,
  handleLoadButton,
  handleDownloadButton
}: UserQuery & UseDownloadHooksProps & UseScannerHooksProps & { handleEditButton: TriggerByHash }) {
  const createdAtDate = new Date(createdAt || '');
  const createLocalTimeDate = createdAtDate.toLocaleString('he-IL', {
    timeZone: 'Asia/Jerusalem'
  });

  //Handle the conversion of the userQuery value to the real text.
  const experienceText = handleConvertUserQueryToText(experience, EXPERIENCE_OPTIONS);
  const distanceText = handleConvertUserQueryToText(distance, DISTANCE_OPTIONS);
  const jobTypeText = handleConvertUserQueryToText(jobType, JOB_TYPES_OPTIONS);
  const scopeText = handleConvertUserQueryToText(scope, SCOPES_OPTIONS);
  const fieldProps = {
    containerStyle: searchItemStyle.fieldItemContainer,
    titleStyle: searchItemStyle.title
  };

  return (
    <li className={searchItemStyle.item}>
      <div className={searchItemStyle.editButtonContainer}>
        <button className={searchItemStyle.editButton} onClick={handleEditButton(hash)}>
          <AiTwotoneEdit />
        </button>
      </div>

      <div>
        <Field {...fieldProps} title={'נוצר ב-'} value={createLocalTimeDate} />
      </div>
      <div className={searchItemStyle.fieldsContainer}>
        <Field {...fieldProps} title={'תפקיד:'} value={position} />
        <Field {...fieldProps} title={'שנות ניסיון:'} value={experienceText} />
      </div>
      <div className={searchItemStyle.fieldsContainer}>
        <Field {...fieldProps} title={'מיקום:'} value={location} />
        <Field {...fieldProps} title={'מרחק:'} value={distanceText} />
      </div>
      <div>
        <Field {...fieldProps} title={'סוג העבודה:'} value={jobTypeText} />
      </div>
      <div>
        <Field {...fieldProps} title={'היקף משרה:'} value={scopeText} />
      </div>
      <div className={searchItemStyle.fieldsContainer}>
        <Field {...fieldProps} title={'משרות שנמצאו:'} value={String(numResultFound || 0)} />
        <Field {...fieldProps} title={'משרות מתאימות:'} value={String(numMatches || 0)} />
      </div>
      <div className={searchItemStyle.buttonsContainer}>
        <SearchButton
          onClick={handleLoadButton(hash)}
          disabled={scanner.isMutating}
          className={searchItemStyle.download}
        >
          חפש מחדש
        </SearchButton>

        <DownloadButton
          onClick={handleDownloadButton(hash)}
          disabled={downloadState.isMutating}
          className={searchItemStyle.download}
        >
          הורדה
        </DownloadButton>
      </div>
    </li>
  );
}

export default SearchItem;