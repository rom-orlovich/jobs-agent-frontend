import { useJobTrackingForm } from '@/hooks/useJobTrackingForm/useJobTrackingForm';
import { Job } from '@/lib/jobsScanner.types';
import React from 'react';

import InputLabel from '../Inputs/InputLabel/InputLabel';
import ToggleTopic from '../UserProfileForm/ToggleTopic';
import StagesInfo from './StagesInfo/StagesInfo';
export const jobTrackingFormStyle = {
  formContainer: 'flex justify-center w-full h-full ',
  card: 'card min-w-[23rem] max-w-[25rem] min-h-[28rem]  p-8',
  title: 'text-2xl underline',
  company: 'text-xl underline mt-2',
  form: 'flex flex-col mt-4   max-h-[30rem] min-h-[15rem] justify-between relative',
  formContent: 'flex flex-col gap-8 ',
  headingToggle: 'text-xl',
  buttonsContainer: 'flex justify-between w-full ',
  label: 'flex flex-col ',
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
              // checked: !!formValues.sendCV?.pass,
              id: 'pass',
              onChange: handleOnChangeValue
            }}
          >
            התקבל?
          </InputLabel>
        </ToggleTopic>

        {/* <ToggleTopic
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
        </ToggleTopic> */}
        <StagesInfo {...jobTrackingForm} />
      </div>
    </form>
  );
}

export default JobTrackingForm;
