import RadioButtons from '@/components/Inputs/RadioButtons/RadioButtons';
import { JobTrackingFormComponentsProps } from '@/hooks/useJobTrackingForm/useJobTrackingForm';
import React from 'react';
import { jobTrackingFormStyle } from '../JobTrackingForm';
function SentCVAnswers(props: JobTrackingFormComponentsProps<unknown>) {
  return (
    <RadioButtons
      curState={props.formValues.statusCV.wasSent}
      labelProps={{
        className: jobTrackingFormStyle.wasSentLabel
      }}
      inputProps={{
        name: 'wasSent',

        onChange: props.handleRadioButtons
      }}
      options={['כן', 'לא']}
    />
  );
}

export default SentCVAnswers;
