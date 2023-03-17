import { TrackingInfo, TrackingInfoFormFormat } from '@/lib/types/jobsScanner.types';
import { convertDateToValidInputFormat } from '@/lib/utils';
/**
 * @returns {TrackingInfoFormFormat} The form's default values.
 */
export function getJobTrackingFormDefaultValues(): TrackingInfoFormFormat {
  //Get valid current date input's format.
  const curDate = convertDateToValidInputFormat();

  //Form's default values when current user's job info form is empty.
  const defaultValues: TrackingInfoFormFormat = {
    createdAt: curDate,
    statusCV: {
      wasSent: 'לא',
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
 * @param {TrackingInfo} initialValues The job info data from the DB.
 * @returns {TrackingInfoFormFormat} Convert the job info data from the DB to form format.
 */

export const handleConvertInitialValues: (initialValues?: TrackingInfo) => TrackingInfoFormFormat = (
  initialValues
) => {
  const defaultValues = getJobTrackingFormDefaultValues();

  return {
    ...initialValues,
    createdAt: new Date(initialValues?.createdAt || new Date()).toISOString() || defaultValues.createdAt,
    statusCV: {
      wasSent: initialValues?.statusCV?.wasSent ? 'כן' : 'לא',
      pass: !!initialValues?.statusCV?.pass,
      date: convertDateToValidInputFormat(initialValues?.statusCV?.date)
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

 * @param {TrackingInfoFormFormat} formValues The job info data as form values.
 * @returns {TrackingInfo} Convert the job info data as form values to the DB to format.
 */

export function handleConvertToFormResult(formValues: TrackingInfoFormFormat): TrackingInfo {
  return {
    createdAt: new Date(formValues.createdAt),
    statusCV: {
      wasSent: formValues.statusCV.wasSent === 'כן' ? true : false,
      pass: !!formValues?.statusCV?.pass,
      date: new Date(formValues.statusCV?.date)
    },
    stages: formValues?.stages.map((stage) => ({
      ...stage,
      date: new Date(stage?.date)
    }))
  };
}
