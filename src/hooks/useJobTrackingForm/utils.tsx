import { TrackInfo, TrackInfoFormFormat } from '@/lib/jobsScanner.types';
import { convertDateToValidInputFormat } from '@/lib/utils';
/**
 * @returns {TrackInfoFormFormat} The form's default values.
 */
export function getJobTrackingFormDefaultValues(): TrackInfoFormFormat {
  //Get valid current date input's format.
  const curDate = convertDateToValidInputFormat();

  //Form's default values when current user's job info form is empty.
  const defaultValues: TrackInfoFormFormat = {
    createdAt: curDate,
    sendCV: {
      date: curDate,
      pass: false
    },
    stages: [
      {
        feedback: '',
        name: '',
        pass: false,
        date: curDate
      }
    ]
  };
  return defaultValues;
}

/**
 * @param {TrackInfo} initialValues The job info data from the DB.
 * @returns {TrackInfoFormFormat} Convert the job info data from the DB to form format.
 */

export const handleConvertInitialValues: (initialValues?: TrackInfo) => TrackInfoFormFormat = (
  initialValues
) => {
  const defaultValues = getJobTrackingFormDefaultValues();
  return {
    ...initialValues,
    createdAt: convertDateToValidInputFormat(initialValues?.createdAt),
    sendCV: {
      pass: !!initialValues?.sendCV?.pass,
      date: convertDateToValidInputFormat(initialValues?.sendCV?.date)
    },
    stages: initialValues?.stages?.length
      ? //Convert stages if they exist to proper form format else use the default value.
        initialValues?.stages.map((stage) => ({
          ...stage,
          date: convertDateToValidInputFormat(stage.date)
        }))
      : defaultValues.stages
  };
};
/**

 * @param {TrackInfoFormFormat} formValues The job info data as form values.
 * @returns {TrackInfo} Convert the job info data as form values to the DB to format.
 */

export function handleConvertToFormResult(formValues: TrackInfoFormFormat): TrackInfo {
  return {
    createdAt: new Date(formValues.createdAt),
    sendCV: {
      pass: !!formValues?.sendCV?.pass,
      date: new Date(formValues.sendCV?.date)
    },
    stages: formValues?.stages.map((stage) => ({
      ...stage,
      date: new Date(stage?.date)
    }))
  };
}