import { updateJobsTracking } from '@/lib/api/jobsTracking.utils';
import { Job, TrackingInfoFormFormat } from '@/lib/types/jobsScanner.types';
import { getResMessage } from '@/lib/utils';

import { ChangeEventHandler } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import useForm from '../useForm';
import { handleConvertInitialValues, handleConvertToFormResult } from './utils';

export const useJobTrackingForm = (job: Job, userID: string) => {
  const initialValues = handleConvertInitialValues(job.info);

  const { formState, formValues, onSubmit, setFormValues } =
    useForm<TrackingInfoFormFormat>(initialValues);

  const handleOnChangeValue: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormValues((pre) => ({
      ...pre,
      sendCV: {
        ...pre.sendCV,
        [e.target.id]: e.target.value
      }
    }));
  };
  const handleSetStagesValues = (values: TrackingInfoFormFormat['stages']) => {
    setFormValues((pre) => ({
      ...pre,
      stages: values
    }));
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
    handleSetStagesValues
  };
};
export type JobTrackingFormComponentsProps<T> = T & ReturnType<typeof useJobTrackingForm>;
