import { useAuthContext } from '@/context/UserContext';
import { ReturnUseFilterJobsProps } from '@/hooks/useFilterJobs/useFilterJobs';
import { useSwrHook } from '@/hooks/useSwr';

import { createJobsURl } from '@/lib/jobs.utils';
import { ResponseGetJobs } from '@/lib/jobsScanner.types';

import React from 'react';
import { BiSearch } from 'react-icons/bi';
import Autocomplete from '../../Inputs/Autocomplete/Autocomplete';

function JobsSearch(filterJobsProps: ReturnUseFilterJobsProps) {
  console.log(filterJobsProps);
  const { userProfileData } = useAuthContext();
  const { data } = useSwrHook<ResponseGetJobs>(createJobsURl(userProfileData.userID || ''));
  console.log(data);
  const jobsSearchStyle = {
    jobSearchContainer: 'flex justify-start',
    autocompleteWrapper: 'flex flex-col max-w-[50%]'
  };
  return (
    <div dir="ltr" className={jobsSearchStyle.jobSearchContainer}>
      <Autocomplete
        inputLabelProps={{
          IconButtonProps: {
            Icon: <BiSearch />,
            buttonProps: {}
          },
          wrapperInputLabel: {
            className: jobsSearchStyle.autocompleteWrapper
          }
        }}
        options={[]}
        label="חיפוש"
      />
    </div>
  );
}

export default JobsSearch;
