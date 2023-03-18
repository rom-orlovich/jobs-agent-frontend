import InputLabel from '@/components/Inputs/InputLabel/InputLabel';
import ToggleTopic from '@/components/UserProfileForm/ToggleTopic';
import { JobTrackingFormComponentsProps } from '@/hooks/useJobTrackingForm/useJobTrackingForm';
import React from 'react';
import { jobTrackingFormStyle } from '../JobTrackingForm';
import SentCVAnswers from './SentCVAnswers';

function StatusCV(props: JobTrackingFormComponentsProps<unknown>) {
  return (
    <ToggleTopic
      headingProps={{
        title: 'שלחת קורות חיים?',
        className: jobTrackingFormStyle.headingToggle
      }}
      childrenWrapper={{
        className: 'p-1 flex flex-col gap-2'
      }}
    >
      <SentCVAnswers {...props} />

      <div className="flex px-3">
        <InputLabel
          labelProps={{
            className: jobTrackingFormStyle.label
          }}
          inputProps={{
            type: 'date',

            value: props.formValues.statusCV?.date as unknown as string,
            id: 'date',
            onChange: props.handleOnChangeValue
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
            checked: props.formValues.statusCV?.pass,
            id: 'pass',
            onChange: props.handleOnChangeValue
          }}
        >
          התקבלו?
        </InputLabel>
      </div>
    </ToggleTopic>
  );
}

export default StatusCV;
