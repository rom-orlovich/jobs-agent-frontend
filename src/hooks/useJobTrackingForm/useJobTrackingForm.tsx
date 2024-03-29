import { RenderElement } from '@/components/Inputs/DynamicInputs/dynamicInputs.types';
import { updateJobsTracking } from '@/lib/api/jobsTracking.utils';
import { APP_ROUTES } from '@/lib/routes';
import { Job, TrackingInfoFormFormat } from '@/lib/types/jobsScanner.types';
import { getResMessage } from '@/lib/utils';
import { useRouter } from 'next/router';

import { ChangeEventHandler } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { useDebouncedCallback } from 'use-debounce';
import useForm from '../useForm';
import { handleConvertInitialValues, handleConvertToFormResult } from './utils';

/**
 * This hooks handle the JobTracking info form.
 */
export const useJobTrackingForm = (job: Job, userID: string) => {
  const router = useRouter();
  //Convert the job info from the DB to valid form values.
  const initialValues = handleConvertInitialValues(job.info);

  const { formState, formValues, onSubmit, setFormValues } =
    useForm<TrackingInfoFormFormat>(initialValues);

  //Handle onChange of input.
  //If input's id is pass the input's type is checkbox.
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

  //Handle the onChange of the radio button.
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
  //Convert the stages values to valid DB format.
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
  //Submit the form and update the job tracking info.
  const handleSubmit = async (values: TrackingInfoFormFormat) => {
    const formsValues = handleConvertToFormResult(values);

    try {
      const results = await updateJobsTracking(userID, {
        ...job,
        info: formsValues
      });

      //Mutate the user profile.
      await mutate(`/api/users/${userID}`);
      await router.push({
        pathname: '/' + APP_ROUTES.JOBS_TRACKING,
        query: {
          noMessage: true
        }
      });
      toast(results.data.message);
    } catch (error) {
      console.log(error);
      toast(getResMessage('TRACKING_JOB_NOT_UPDATED').message);
    }
  };

  return {
    formValues: formValues,
    formState,
    handleSetStagesValues: useDebouncedCallback(handleSetStagesValues, 500),
    onSubmit: onSubmit(handleSubmit),
    handleOnChangeValue,
    handleRadioButtons
  };
};
export type JobTrackingFormComponentsProps<T> = T & ReturnType<typeof useJobTrackingForm>;
