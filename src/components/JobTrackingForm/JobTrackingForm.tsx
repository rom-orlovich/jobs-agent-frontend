import { useJobTrackingForm } from '@/hooks/useJobTrackingForm/useJobTrackingForm';
import { Job } from '@/lib/types/jobsScanner.types';

import React from 'react';
import JobTrackingFormButtons from './JobTrackingFormButtons';

import StatusCV from './SentCV/StatusCV';
import StagesInfo from './StagesInfo/StagesInfo';

export const jobTrackingFormStyle = {
  form: 'flex flex-col  max-h-[30rem] min-h-[20rem] justify-between relative',
  formContent: 'flex flex-col gap-8 mt-2',
  headingToggle: 'text-xl',
  buttonsContainer: 'flex justify-between w-full ',
  toggleTopicWrapper: 'flex gap-4',

  wasSentLabel: 'flex gap-2 mt-2 font-semibold',
  label: 'flex flex-col gap-2 mt-2 font-semibold',
  dateInput: 'max-w-[8rem] text-center'
};

function JobTrackingForm({ job, userID }: { job: Job; userID: string }) {
  const jobTrackingForm = useJobTrackingForm(job, userID);
  const { onSubmit } = jobTrackingForm;

  return (
    <form onSubmit={onSubmit} className={jobTrackingFormStyle.form}>
      <div className={jobTrackingFormStyle.formContent}>
        <StatusCV {...jobTrackingForm} />
        <StagesInfo {...jobTrackingForm} />
      </div>
      <JobTrackingFormButtons />
    </form>
  );
}

export default JobTrackingForm;
