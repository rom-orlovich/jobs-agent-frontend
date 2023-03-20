import { RenderElement } from '@/components/Inputs/DynamicInputs/dynamicInputs.types';
import InputLabel from '@/components/Inputs/InputLabel/InputLabel';
import ToggleTopic from '@/components/ToggleTopic/ToggleTopic';

import { TrackingInfoFormFormat } from '@/lib/types/jobsScanner.types';
import React, { ChangeEventHandler } from 'react';
import { jobTrackingFormStyle } from '../JobTrackingForm';
function StageInputs({
  name,
  pass,
  feedback,
  date,
  setValue
}: RenderElement<TrackingInfoFormFormat['stages'][0]>) {
  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const target = e.target as HTMLInputElement;
    if (setValue) {
      setValue({
        name,
        pass,
        feedback,
        date,
        [target.id]: target.id === 'pass' ? target.checked : target.value
      });
    }
  };

  return (
    <ToggleTopic
      as={() => (
        <InputLabel
          labelProps={{
            className: `${jobTrackingFormStyle.label} w-full`
          }}
          inputProps={{
            className: '',
            value: name || '',
            id: 'name',
            onChange: onChange
          }}
        >
          שם שלב
        </InputLabel>
      )}
    >
      <div className="my-3 flex">
        <InputLabel
          labelProps={{
            className: jobTrackingFormStyle.label
          }}
          inputProps={{
            type: 'date',
            value: (date || '') as unknown as string,

            id: 'date',
            onChange: onChange
          }}
        >
          תאריך
        </InputLabel>

        <InputLabel
          labelProps={{
            className: jobTrackingFormStyle.label
          }}
          inputProps={{
            type: 'checkbox',
            checked: pass || false,
            id: 'pass',
            onChange: onChange
          }}
        >
          עברתי?
        </InputLabel>
      </div>
      <InputLabel
        labelProps={{
          className: jobTrackingFormStyle.label
        }}
        textAreaProps={{
          value: feedback || '',
          id: 'feedback',
          onChange: onChange
        }}
      >
        פידבק
      </InputLabel>
    </ToggleTopic>
  );
}

export default StageInputs;
