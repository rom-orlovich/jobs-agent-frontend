// import SuccessButton from '@/components/Buttons/SuccessButton';
// import DynamicInputs from '@/components/Inputs/DynamicInputs/DynamicInputs';
// import InputLabel from '@/components/Inputs/InputLabel/InputLabel';
// import ToggleTopic from '@/components/UserProfileForm/ToggleTopic';
import JobTrackingForm from '@/components/JobTrackForm/JobTrackForm';
import { useAuthContext } from '@/context/AuthContext';
import useForm from '@/hooks/useForm';
import useRedirect from '@/hooks/useRedirct';
import { updateJobsTracking } from '@/lib/api/jobsTracking/handlers';

import { checkIsJobFoundWithToast } from '@/lib/jobs.utils';

import { Job, TrackInfo } from '@/lib/jobsScanner.types';
// import useForm from '@/hooks/useForm';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ChangeEventHandler } from 'react';

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
export const useJobTrackingForm = (job: Job, userID: string) => {
  const initialValues = job?.info;

  const convertDateToValidInputFormat = (date?: Date) => {
    return (date instanceof Date ? date : new Date()).toISOString().slice(0, 10) as unknown as Date;
  };
  const curDate = convertDateToValidInputFormat(new Date());
  const defaultValues: TrackInfo = {
    createdAt: initialValues?.createdAt || new Date(),
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
  const handleConvertInitialValue: (initialValues?: TrackInfo) => TrackInfo = (initialValues) => ({
    ...initialValues,
    createdAt: initialValues?.createdAt || new Date(),
    sendCV: {
      pass: !!initialValues?.sendCV?.pass,
      date: convertDateToValidInputFormat(initialValues?.sendCV?.date)
    },
    stages: initialValues?.stages?.length
      ? initialValues?.stages.map((stage) => ({
          ...stage,
          date: convertDateToValidInputFormat(stage.date)
        }))
      : defaultValues.stages
  });
  const handleConvertToFormResult: (formValues: TrackInfo) => TrackInfo = (formValues) => {
    return {
      createdAt: initialValues?.createdAt || new Date(),
      sendCV: {
        pass: !!formValues?.sendCV?.pass,

        date: new Date(formValues.sendCV?.date || new Date())
      },
      stages: formValues?.stages?.length
        ? formValues?.stages.map((stage) => ({
            ...stage,
            date: new Date(stage?.date || new Date())
          }))
        : defaultValues.stages
    };
  };

  const { formState, formValues, onSubmit, setFormValues } = useForm<TrackInfo>(
    handleConvertInitialValue(initialValues) || defaultValues
  );

  const handleOnChangeValue: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormValues((pre) => ({
      ...pre,
      sendCV: {
        ...pre.sendCV,
        [e.target.id]: e.target.value
      }
    }));
  };
  const handleSetStageValues = (values: TrackInfo['stages']) => {
    console.log(values);
    setFormValues((pre) => ({
      ...pre,
      stages: values
    }));
  };

  const handleSubmit = async (values: TrackInfo) => {
    const formsValue = handleConvertToFormResult(values);
    const res = await updateJobsTracking(userID, {
      ...job,
      info: formValues
    });
    console.log(res, formsValue);
  };

  return {
    formValues: handleConvertInitialValue(formValues),
    formState,
    onSubmit: onSubmit(handleSubmit),

    handleOnChangeValue,
    handleSetStageValues
  };
};

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
  // const { handleOnChangeValue, handleSetStageValues, formValues, onSubmit } = useJobTrackingForm(
  //   jobTracking!,
  //   jobTrackingData?.userProfileData?.userID || ''
  // );

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
        {/* <form onSubmit={onSubmit} className={jobTrackingFormStyle.form}>
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
                          handleSetStageValues(
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
            </ToggleTopic>
          </div>
        </form> */}
      </div>
    </div>
  );
}

export default JobTracking;
