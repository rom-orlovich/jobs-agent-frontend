import React from 'react';

import DynamicInputs from '../../Inputs/DynamicInputs/DynamicInputs';

import ToggleTopic from '../../UserProfileForm/ToggleTopic';
import { JobTrackingFormComponentsProps } from '@/hooks/useJobTrackingForm/useJobTrackingForm';
import StageInputs from './StageInputs';
import { jobTrackingFormStyle } from '../JobTrackingForm';
import JobTrackingFormButtons from '../JobTrackingFormButtons';
function StagesInfo(props: JobTrackingFormComponentsProps<unknown>) {
  const { formValues } = props;
  return (
    <ToggleTopic
      headingProps={{
        title: 'באיזה שלב אתה?',
        className: jobTrackingFormStyle.headingToggle
      }}
    >
      <DynamicInputs
        overflowProps={{
          minChild: 2,
          innerDiv: {
            className: 'p-3 h-[5rem]'
          },
          outerDiv: {
            className: 'p-1 h-[10rem]'
          },
          activeClassOuter: 'min-h-[14rem]',
          activeClassInner: 'min-h-[18rem]'
        }}
        removeButtonProps={{
          className: '!top-0'
        }}
        defaultValues={[formValues.stages[0]]}
        Render={StageInputs}
      >
        {(values) => {
          return <JobTrackingFormButtons values={values} {...props} />;
        }}
      </DynamicInputs>
    </ToggleTopic>
  );
}

export default StagesInfo;
