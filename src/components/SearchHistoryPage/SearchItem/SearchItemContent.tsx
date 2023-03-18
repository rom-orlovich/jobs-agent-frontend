import Field from '@/components/Field/Field';
import { UserQuery } from '@/lib/types/api.types';
import {
  DISTANCE_OPTIONS,
  EXPERIENCE_OPTIONS,
  JOB_TYPES_OPTIONS,
  SCOPES_OPTIONS
} from '@/lib/userQueryOptions';
import { createLocalDate } from '@/lib/utils';
import React from 'react';
import { handleConvertUserQueryToText } from '../utils';

const searchItemContentStyle = {
  fieldsContainer: 'flex gap-2 flex-row',
  fieldItemContainer: 'flex xs:flex-row flex-col gap-1',
  title: 'font-bold'
};
function SearchItemContent(props: UserQuery) {
  //Handle the conversion of the userQuery value to the real text.
  const experienceText = handleConvertUserQueryToText(props.experience, EXPERIENCE_OPTIONS);
  const distanceText = handleConvertUserQueryToText(props.distance, DISTANCE_OPTIONS);
  const jobTypeText = handleConvertUserQueryToText(props.jobType, JOB_TYPES_OPTIONS);
  const scopeText = handleConvertUserQueryToText(props.scope, SCOPES_OPTIONS);

  const createdAtDate = new Date(props.createdAt || '');
  const createLocalTimeDate = createLocalDate(createdAtDate);
  const fieldProps = {
    containerStyle: searchItemContentStyle.fieldItemContainer,
    titleStyle: searchItemContentStyle.title
  };
  return (
    <>
      <div>
        <Field {...fieldProps} title={'עודכן ב-'} value={createLocalTimeDate} />
      </div>
      <div className={searchItemContentStyle.fieldsContainer}>
        <Field {...fieldProps} title={'תפקיד:'} value={props.position} />
        <Field {...fieldProps} title={'שנות ניסיון:'} value={experienceText} />
      </div>
      <div className={searchItemContentStyle.fieldsContainer}>
        <Field {...fieldProps} title={'מיקום:'} value={props.location} />
        <Field {...fieldProps} title={'מרחק:'} value={distanceText} />
      </div>
      <div>
        <Field {...fieldProps} title={'סוג העבודה:'} value={jobTypeText} />
      </div>
      <div>
        <Field {...fieldProps} title={'היקף משרה:'} value={scopeText} />
      </div>
      <div className={searchItemContentStyle.fieldsContainer}>
        <Field
          {...fieldProps}
          title={'משרות חדשות שנמצאו:'}
          value={String(props.numResultsFound || 0)}
        />
        <Field {...fieldProps} title={'מספר התאמות חדשות:'} value={String(props.numMatches || 0)} />
      </div>
    </>
  );
}

export default SearchItemContent;
