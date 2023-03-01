import SuccessButton from '@/components/Buttons/SuccessButton';
import DynamicInputs from '@/components/Inputs/DynamicInputs/DynamicInputs';
import InputLabel from '@/components/Inputs/InputLabel/InputLabel';
import ToggleTopic from '@/components/UserProfileForm/ToggleTopic';
import { useAuthContext } from '@/context/AuthContext';
// import useForm from '@/hooks/useForm';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const useGetJobsTrack = () => {
  const router = useRouter();
  const { userProfileData } = useAuthContext();

  const jobID = String(router.query.jobID);

  const curJobTrack = userProfileData.jobsTrack?.find((jobTrack) => jobTrack.jobID === jobID);
  return {
    curJobTrack,
    userProfileData
  };
};
// const useJobTrackForm = () => {
//   // const { formState, formValues, onChange, onSubmit, setFormValues } = useForm({});
// };

const jobTrackFormStyle = {
  formContainer: 'flex justify-center w-full h-full',
  card: 'card min-w-[23rem] max-w-[25rem] min-h-[28rem]  p-8',
  title: 'text-2xl underline',
  company: 'text-xl underline mt-2',
  form: 'flex flex-col mt-4  max-h-[22em] h-[22rem] justify-between',
  formContent: 'flex flex-col gap-8 ',
  headingToggle: 'text-xl',
  buttonsContainer: 'flex justify-between w-full mt-2',
  label: 'flex flex-col ',
  dateInput: 'max-w-[8rem]',
  toggleTopicWrapper: 'flex gap-1'
};
function JobTrackForm() {
  const router = useRouter();
  const jobTrackData = useGetJobsTrack();
  const { curJobTrack } = jobTrackData;
  return (
    <div className={jobTrackFormStyle.formContainer}>
      <div className={jobTrackFormStyle.card}>
        <h1 dir={'ltr'} className={jobTrackFormStyle.title}>
          <Link href={curJobTrack?.link || ''}>{curJobTrack?.title} </Link>
        </h1>
        <h2 className={jobTrackFormStyle.company} dir={'ltr'}>
          {curJobTrack?.company}
        </h2>
        <form onSubmit={(e) => e.preventDefault()} className={jobTrackFormStyle.form}>
          <div className={jobTrackFormStyle.formContent}>
            <ToggleTopic
              childrenWrapper={{
                className: jobTrackFormStyle.toggleTopicWrapper
              }}
              headingProps={{
                title: 'שלחת קו"ח?',
                className: jobTrackFormStyle.headingToggle
              }}
            >
              <InputLabel
                labelProps={{
                  className: jobTrackFormStyle.label
                }}
                inputProps={{
                  type: 'date',
                  className: jobTrackFormStyle.dateInput
                }}
              >
                מתי?
              </InputLabel>
              <InputLabel
                labelProps={{
                  className: jobTrackFormStyle.label
                }}
                inputProps={{
                  type: 'checkbox'
                }}
              >
                התקבל?
              </InputLabel>
            </ToggleTopic>

            <ToggleTopic
              headingProps={{
                title: 'באיזה שלב אתה?',
                className: jobTrackFormStyle.headingToggle
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
                defaultValues={[
                  {
                    date: undefined,

                    name: '',
                    pass: false
                  }
                ]}
                Render={({}: { name: string; date?: string; pass: boolean }) => {
                  return (
                    <ToggleTopic as={() => <InputLabel inputProps={{}}>שם שלב</InputLabel>}>
                      <div className="flex">
                        <InputLabel
                          labelProps={{
                            className: jobTrackFormStyle.label
                          }}
                          inputProps={{
                            type: 'date',
                            className: jobTrackFormStyle.dateInput
                          }}
                        >
                          תאריך?
                        </InputLabel>

                        <InputLabel
                          labelProps={{
                            className: jobTrackFormStyle.label
                          }}
                          inputProps={{
                            type: 'checkbox'
                          }}
                        >
                          עברתי?
                        </InputLabel>
                      </div>
                      <InputLabel textAreaProps={{}}>פידבק</InputLabel>
                    </ToggleTopic>
                  );
                }}
              >
                {(values) => {
                  console.log(values);
                  return <></>;
                }}
              </DynamicInputs>
            </ToggleTopic>
          </div>
          <div className={jobTrackFormStyle.buttonsContainer}>
            <SuccessButton onClick={() => router.back()}>חזור</SuccessButton>

            <SuccessButton>שמור</SuccessButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobTrackForm;
