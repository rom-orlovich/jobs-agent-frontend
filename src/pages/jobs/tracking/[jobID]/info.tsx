import JobTrackingForm from '@/components/JobTrackingForm/JobTrackingForm';
import { useAuthContext } from '@/context/AuthContext';

import useRedirect from '@/hooks/useRedirect';

import { checkIsJobFoundWithToast } from '@/lib/jobs.utils';
// import useForm from '@/hooks/useForm';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export const useGetJobsTrack = () => {
  const router = useRouter();
  const { userProfileData } = useAuthContext();

  const jobID = String(router.query.jobID);

  const curJobTracking = userProfileData.tracking?.find((jobTracking) => jobTracking.jobID === jobID);
  return {
    curJobTracking,
    userProfileData
  };
};
// export const useJobTrackingForm = (job: Job, userID: string) => {
//   const initialValues = job?.info;

//   const convertDateToValidInputFormat = (date?: Date) => {
//     return (date instanceof Date ? date : new Date()).toISOString().slice(0, 10) as unknown as Date;
//   };
//   const curDate = convertDateToValidInputFormat(new Date());
//   const defaultValues: TrackingInfo = {
//     createdAt: initialValues?.createdAt || new Date(),
//     sendCV: {
//       date: curDate,
//       pass: false
//     },
//     stages: [
//       {
//         feedback: '',
//         name: '',
//         pass: false,
//         date: curDate
//       }
//     ]
//   };
//   const handleConvertInitialValue: (initialValues?: TrackingInfo) => TrackingInfo = (initialValues) => ({
//     ...initialValues,
//     createdAt: initialValues?.createdAt || new Date(),
//     sendCV: {
//       pass: !!initialValues?.sendCV?.pass,
//       date: convertDateToValidInputFormat(initialValues?.sendCV?.date)
//     },
//     stages: initialValues?.stages?.length
//       ? initialValues?.stages.map((stage) => ({
//           ...stage,
//           date: convertDateToValidInputFormat(stage.date)
//         }))
//       : defaultValues.stages
//   });
//   const handleConvertToFormResult: (formValues: TrackingInfo) => TrackingInfo = (formValues) => {
//     return {
//       createdAt: initialValues?.createdAt || new Date(),
//       sendCV: {
//         pass: !!formValues?.sendCV?.pass,

//         date: new Date(formValues.sendCV?.date || new Date())
//       },
//       stages: formValues?.stages?.length
//         ? formValues?.stages.map((stage) => ({
//             ...stage,
//             date: new Date(stage?.date || new Date())
//           }))
//         : defaultValues.stages
//     };
//   };

//   const { formState, formValues, onSubmit, setFormValues } = useForm<TrackingInfo>(
//     handleConvertInitialValue(initialValues) || defaultValues
//   );

//   const handleOnChangeValue: ChangeEventHandler<HTMLInputElement> = (e) => {
//     setFormValues((pre) => ({
//       ...pre,
//       sendCV: {
//         ...pre.sendCV,
//         [e.target.id]: e.target.value
//       }
//     }));
//   };
//   const handleSetStagesValues = (values: TrackingInfo['stages']) => {
//     console.log(values);
//     setFormValues((pre) => ({
//       ...pre,
//       stages: values
//     }));
//   };

//   const handleSubmit = async (values: TrackingInfo) => {
//     const formsValue = handleConvertToFormResult(values);
//     const res = await updateJobsTracking(userID, {
//       ...job,
//       info: formValues
//     });
//     console.log(res, formsValue);
//   };

//   return {
//     formValues: handleConvertInitialValue(formValues),
//     formState,
//     onSubmit: onSubmit(handleSubmit),

//     handleOnChangeValue,
//     handleSetStagesValues
//   };
// };

const jobTrackingFormStyle = {
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
function JobTracking() {
  // const router = useRouter();
  const jobTrackingData = useGetJobsTrack();
  const jobTracking = jobTrackingData?.curJobTracking;
  const job = useRedirect(() => checkIsJobFoundWithToast(jobTracking));

  if (!job) return <></>;
  const { curJobTracking } = jobTrackingData;
  return (
    <div className={jobTrackingFormStyle.formContainer}>
      <div className={jobTrackingFormStyle.card}>
        <h1 dir={'ltr'} className={jobTrackingFormStyle.title}>
          <Link href={curJobTracking?.link || ''}>{curJobTracking?.title} </Link>
        </h1>
        <h2 className={jobTrackingFormStyle.company} dir={'ltr'}>
          {curJobTracking?.company}
        </h2>
        <JobTrackingForm job={job} userID={jobTrackingData.userProfileData.userID || ''} />
      </div>
    </div>
  );
}

export default JobTracking;
