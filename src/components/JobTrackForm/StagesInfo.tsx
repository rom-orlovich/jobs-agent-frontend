import { useRouter } from 'next/router';
import React, { ChangeEventHandler } from 'react';
import SuccessButton from '../Buttons/SuccessButton';
import DynamicInputs from '../Inputs/DynamicInputs/DynamicInputs';
import InputLabel from '../Inputs/InputLabel/InputLabel';
import ToggleTopic from '../UserProfileForm/ToggleTopic';
import { jobTrackingFormStyle } from './JobTrackForm';

import { JobTrackingFormComponentsProps } from '@/hooks/useJobTrackingForm/useJobTrackingForm';

function StagesInfo({ formValues }: JobTrackingFormComponentsProps<unknown>) {
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
        Render={({ name, pass, feedback, date, setValue }) => {
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
        }}
      >
        {() => {
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
                  // handleSetStageValues(
                  //   values.map(({ date, feedback, name, pass }) => ({
                  //     date,
                  //     feedback,
                  //     name,
                  //     pass
                  //   }))
                  // );
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
