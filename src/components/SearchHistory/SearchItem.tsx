import { UserQuery } from '@/lib/types/api.types';
import { GenericRecord } from '@/lib/types/types';
import {
  DISTANCE_OPTIONS,
  EXPERIENCE_OPTIONS,
  JOB_TYPES_OPTIONS,
  SCOPES_OPTIONS
} from '@/lib/userQueryOptions';
import React from 'react';
import Field from '../Field/Field';
import { Option } from '../Inputs/SelectInput/selectInput.types';

const handleConvertUserQueryToText = (value: string, options: Option<string>[]) => {
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
  item: 'bg-white shadow-lg rounded-md flex flex-col border-none flex-[70%] p-[1.5rem] gap-2',
  fieldsContainer: 'flex gap-2 flex-row',
  fieldItemContainer: 'flex xs:flex-row flex-col gap-1',
  title: 'font-bold'
};

function SearchItem({ distance, experience, jobType, location, position, scope, createdAt }: UserQuery) {
  const createdAtDate = new Date(createdAt || '');
  const createLocalTimeDate = createdAtDate.toLocaleString('he-IL', {
    timeZone: 'Asia/Jerusalem'
  });
  const experienceText = handleConvertUserQueryToText(experience, EXPERIENCE_OPTIONS);
  const distanceText = handleConvertUserQueryToText(distance, DISTANCE_OPTIONS);
  const jobTypeText = handleConvertUserQueryToText(jobType, JOB_TYPES_OPTIONS);
  const scopeText = handleConvertUserQueryToText(scope, SCOPES_OPTIONS);

  return (
    <li className={searchItemStyle.item}>
      <div>
        <Field
          containerStyle={searchItemStyle.fieldItemContainer}
          titleStyle={searchItemStyle.title}
          title={'נוצר ב-'}
          value={createLocalTimeDate}
        />
      </div>
      <div className={searchItemStyle.fieldsContainer}>
        <Field
          containerStyle={searchItemStyle.fieldItemContainer}
          titleStyle={searchItemStyle.title}
          title={'תפקיד:'}
          value={position}
        />
        <Field
          containerStyle={searchItemStyle.fieldItemContainer}
          titleStyle={searchItemStyle.title}
          title={'שנות ניסיון:'}
          value={experienceText}
        />
      </div>
      <div className={searchItemStyle.fieldsContainer}>
        <Field
          containerStyle={searchItemStyle.fieldItemContainer}
          titleStyle={searchItemStyle.title}
          title={'מיקום:'}
          value={location}
        />
        <Field
          containerStyle={searchItemStyle.fieldItemContainer}
          titleStyle={searchItemStyle.title}
          title={'מרחק:'}
          value={distanceText}
        />
      </div>
      <div>
        <Field
          containerStyle={searchItemStyle.fieldItemContainer}
          titleStyle={searchItemStyle.title}
          title={'סוג העבודה:'}
          value={jobTypeText}
        />
      </div>
      <div>
        <Field
          containerStyle={searchItemStyle.fieldItemContainer}
          titleStyle={searchItemStyle.title}
          title={'היקף משרה:'}
          value={scopeText}
        />
      </div>
    </li>
  );
}

export default SearchItem;
