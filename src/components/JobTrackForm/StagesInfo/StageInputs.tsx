import { RenderElement } from '@/components/Inputs/DynamicInputs/dynamicInputs.types';
import InputLabel from '@/components/Inputs/InputLabel/InputLabel';
import ToggleTopic from '@/components/UserProfileForm/ToggleTopic';
import { TrackingInfoFormFormat } from '@/lib/jobsScanner.types';
import React, { ChangeEventHandler } from 'react';
import { jobTrackingFormStyle } from '../JobTrackForm';

function StageInputs({
  name,
  pass,
  feedback,
  date,
  setValue
}: RenderElement<TrackingInfoFormFormat['stages'][0]>) {
  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    if (setValue) {
      setValue({
        name,
        pass,
        feedback,
        date,
        [e.target.id]: e.target.value === 'on' ? true : e.target.value
      });
    }
  };

  return (
    <ToggleTopic
      as={() => (
        <InputLabel
          inputProps={{
            value: name || '',
            id: 'name',
            onChange: onChange
          }}
        >
          שם שלב
        </InputLabel>
      )}
    >
      <div className="flex">
        <InputLabel
          labelProps={{
            className: jobTrackingFormStyle.label
          }}
          inputProps={{
            type: 'date',
            value: (date || '') as unknown as string,
            className: jobTrackingFormStyle.dateInput,
            id: 'date',
            onChange: onChange
          }}
        >
          תאריך?
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
