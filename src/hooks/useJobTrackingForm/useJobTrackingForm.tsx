import { updateJobsTracking } from '@/lib/api/jobsTracking/handlers';
import { Job, TrackInfoFormFormat } from '@/lib/jobsScanner.types';

import { ChangeEventHandler } from 'react';
import useForm from '../useForm';
import { handleConvertInitialValues, handleConvertToFormResult } from './utils';

export const useJobTrackingForm = (job: Job, userID: string) => {
  const initialValues = handleConvertInitialValues(job.info);

  const { formState, formValues, onSubmit, setFormValues } = useForm<TrackInfoFormFormat>(initialValues);

  const handleOnChangeValue: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormValues((pre) => ({
      ...pre,
      sendCV: {
        ...pre.sendCV,
        [e.target.id]: e.target.value
      }
    }));
  };
  const handleSetStageValues = (values: TrackInfoFormFormat['stages']) => {
    console.log(values);
    setFormValues((pre) => ({
      ...pre,
      stages: values
    }));
  };

  const handleSubmit = async (values: TrackInfoFormFormat) => {
    const formsValues = handleConvertToFormResult(values);

    try {
      const results = await updateJobsTracking(userID, {
        ...job,
        info: formsValues
      });
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    formValues: formValues,
    formState,
    onSubmit: onSubmit(handleSubmit),

    handleOnChangeValue,
    handleSetStageValues
  };
};
export type JobTrackingFormComponentsProps<T> = T & ReturnType<typeof useJobTrackingForm>;
