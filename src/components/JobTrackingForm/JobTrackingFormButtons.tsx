import { JobTrackingFormComponentsProps } from '@/hooks/useJobTrackingForm/useJobTrackingForm';
import { TrackingInfoFormFormat } from '@/lib/types/jobsScanner.types';
import { useRouter } from 'next/router';
import React from 'react';
import SuccessButton from '../Buttons/SuccessButton';
import { RenderElement } from '../Inputs/DynamicInputs/dynamicInputs.types';
import { jobTrackingFormStyle } from './JobTrackingForm';

function JobTrackingFormButtons({
  handleSetStagesValues,
  values
}: JobTrackingFormComponentsProps<unknown> & {
  values: RenderElement<TrackingInfoFormFormat['stages'][0]>[];
}) {
  const router = useRouter();
  return (
    <div className={jobTrackingFormStyle.buttonsContainer}>
      <SuccessButton
        onClick={(e) => {
          e.preventDefault();
          router.back();
        }}
      >
        חזור
      </SuccessButton>

      <SuccessButton
        onClick={() => {
          handleSetStagesValues(
            values.map(({ date, feedback, name, pass }) => ({
              date,
              feedback,
              name,
              pass
            }))
          );
        }}
      >
        שמור
      </SuccessButton>
    </div>
  );
}

export default JobTrackingFormButtons;
