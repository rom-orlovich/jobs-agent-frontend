import { useJobTrackingForm } from '@/hooks/useJobTrackingForm/useJobTrackingForm';
import { Job } from '@/lib/types/jobsScanner.types';

import React from 'react';

import InputLabel from '../Inputs/InputLabel/InputLabel';
import ToggleTopic from '../UserProfileForm/ToggleTopic';
import StagesInfo from './StagesInfo/StagesInfo';

export const jobTrackingFormStyle = {
  form: 'flex flex-col  max-h-[30rem] min-h-[15rem] justify-between relative',
  formContent: 'flex flex-col gap-8 ',
  headingToggle: 'text-xl',
  buttonsContainer: 'flex justify-between w-full ',
  label: 'flex flex-col gap-2',
  dateInput: 'max-w-[8rem]',
  toggleTopicWrapper: 'flex gap-1'
};

function JobTrackingForm({ job, userID }: { job: Job; userID: string }) {
  const jobTrackingForm = useJobTrackingForm(job, userID);
  const { formValues, handleOnChangeValue, onSubmit } = jobTrackingForm;
  return (
    <form onSubmit={onSubmit} className={jobTrackingFormStyle.form}>
      <div className={jobTrackingFormStyle.formContent}>
        <ToggleTopic
          childrenWrapper={{
            className: jobTrackingFormStyle.toggleTopicWrapper
          }}
          headingProps={{
            title: 'שלחת קו"ח?',
            className: jobTrackingFormStyle.headingToggle
          }}
        >
          <InputLabel
            labelProps={{
              className: jobTrackingFormStyle.label
            }}
            inputProps={{
              type: 'date',
              className: jobTrackingFormStyle.dateInput,
              value: formValues.sendCV?.date as unknown as string,
              id: 'date',
              onChange: handleOnChangeValue
            }}
          >
            מתי?
          </InputLabel>
          <InputLabel
            labelProps={{
              className: jobTrackingFormStyle.label
            }}
            inputProps={{
              type: 'checkbox',

              id: 'pass',
              onChange: handleOnChangeValue
            }}
          >
            התקבל?
          </InputLabel>
        </ToggleTopic>
        <StagesInfo {...jobTrackingForm} />
      </div>
    </form>
  );
}

export default JobTrackingForm;
