import { useJobTrackingForm } from '@/hooks/useJobTrackingForm/useJobTrackingForm';
import { Job } from '@/lib/jobsScanner.types';
import { jobTrackingFormStyle } from '@/pages/jobs/tracking/[jobID]/info';
import React from 'react';

import InputLabel from '../Inputs/InputLabel/InputLabel';
import ToggleTopic from '../UserProfileForm/ToggleTopic';
import StagesInfo from './StagesInfo/StagesInfo';

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
              // checked: !!formValues.sendCV?.pass,
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
