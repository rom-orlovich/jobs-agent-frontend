import { useRouter } from 'next/router';
import React from 'react';
import SuccessButton from '../../Buttons/SuccessButton';
import DynamicInputs from '../../Inputs/DynamicInputs/DynamicInputs';
// import InputLabel from '../../Inputs/InputLabel/InputLabel';
import ToggleTopic from '../../UserProfileForm/ToggleTopic';
import { jobTrackingFormStyle } from '../JobTrackingForm';

import { JobTrackingFormComponentsProps } from '@/hooks/useJobTrackingForm/useJobTrackingForm';
import StageInputs from './StageInputs';

function StagesInfo({ formValues, handleSetStagesValues }: JobTrackingFormComponentsProps<unknown>) {
  const router = useRouter();
  return (
    <ToggleTopic
      headingProps={{
        title: 'באיזה שלב אתה?',
        className: jobTrackingFormStyle.headingToggle
      }}
    >
      <DynamicInputs
        overflowProps={{
          minChild: 0,
          innerDiv: {
            className: 'p-3 h-[18rem]'
          }
        }}
        removeButtonProps={{
          className: '!top-0'
        }}
        defaultValues={[formValues.stages[0]]}
        Render={StageInputs}
      >
        {(values) => {
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
        }}
      </DynamicInputs>
    </ToggleTopic>
  );
}

export default StagesInfo;
