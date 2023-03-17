import { RenderElement } from '@/components/Inputs/DynamicInputs/dynamicInputs.types';
import { updateJobsTracking } from '@/lib/api/jobsTracking.utils';
import { Job, TrackingInfoFormFormat } from '@/lib/types/jobsScanner.types';
import { getResMessage } from '@/lib/utils';

import { ChangeEventHandler } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { useDebouncedCallback } from 'use-debounce';
import useForm from '../useForm';
import { handleConvertInitialValues, handleConvertToFormResult } from './utils';

export const useJobTrackingForm = (job: Job, userID: string) => {
  const initialValues = handleConvertInitialValues(job.info);

  const { formState, formValues, onSubmit, setFormValues } =
    useForm<TrackingInfoFormFormat>(initialValues);

  const handleOnChangeValue: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target;
    const checkedCondition = target.id === 'pass';
    setFormValues((pre) => ({
      ...pre,
      statusCV: {
        ...pre.statusCV,
        [target.id]: checkedCondition ? target.checked : target.value
      }
    }));
  };

  const handleRadioButtons: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target;
    const checkedCondition = target.id === 'כן';

    setFormValues((pre) => ({
      ...pre,
      statusCV: {
        ...pre.statusCV,
        wasSent: checkedCondition ? 'כן' : 'לא'
      }
    }));
  };
  const handleSetStagesValues = (values: RenderElement<TrackingInfoFormFormat['stages'][0]>[]) => {
    const stagesValuesMap = values.map(({ date, feedback, name, pass }) => ({
      date,
      feedback,
      name,
      pass
    }));

    setFormValues((pre) => {
      return {
        ...pre,
        stages: stagesValuesMap
      };
    });
  };
  const handleSubmit = async (values: TrackingInfoFormFormat) => {
    const formsValues = handleConvertToFormResult(values);

    try {
      const results = await updateJobsTracking(userID, {
        ...job,
        info: formsValues
      });
      await mutate(`/api/users/${userID}`);
      toast(results.data.message);
    } catch (error) {
      console.log(error);
      toast(getResMessage('TRACKING_JOB_NOT_UPDATED').message);
    }
  };

  return {
    formValues: formValues,
    formState,
    onSubmit: onSubmit(handleSubmit),

    handleOnChangeValue,
    handleSetStagesValues: useDebouncedCallback(handleSetStagesValues, 500),
    handleRadioButtons
  };
};
export type JobTrackingFormComponentsProps<T> = T & ReturnType<typeof useJobTrackingForm>;
