import { Option } from '@/components/Inputs/SelectInput/selectInput.types';
import { useAuthContext } from '@/context/UserContext';
import { ReturnUseFilterJobsProps } from '@/hooks/useFilterJobs/useFilterJobs';
import { useSwrHook } from '@/hooks/useSwr';

import { createJobsURl, getJobsExistData } from '@/lib/jobs.utils';
import { ResponseGetJobs } from '@/lib/jobsScanner.types';

import React from 'react';
import { BiSearch } from 'react-icons/bi';
import Autocomplete from '../../Inputs/Autocomplete/Autocomplete';

function JobsSearch(filterJobsProps: ReturnUseFilterJobsProps) {
  const { handleSearchByTitle, formValues } = filterJobsProps;
  const { userProfileData } = useAuthContext();

  const { data } = useSwrHook<ResponseGetJobs>(
    createJobsURl(userProfileData.userID || '', {
      title: formValues.title
    })
  );

  const options: Option<string>[] = getJobsExistData(data)?.jobs.map((job, i) => ({
    id: job.jobID + i,
    title: job.title,
    value: job.title
  }));
  const jobsSearchStyle = {
    jobSearchContainer: 'flex justify-start px-8',
    autocompleteWrapper: 'flex flex-col max-w-[50%] relative',
    icon: 'text-blue-300 absolute right-2 top-[25%] text-xl',
    input: 'py-1 min-w-[15rem]'
  };
  return (
    <div dir="ltr" className={jobsSearchStyle.jobSearchContainer}>
      <Autocomplete
        setValue={handleSearchByTitle}
        inputLabelProps={{
          IconButtonProps: {
            Icon: <BiSearch className={jobsSearchStyle.icon} />,
            buttonProps: {}
          },
          inputProps: {
            className: jobsSearchStyle.input
          },
          wrapperInputLabel: {
            className: jobsSearchStyle.autocompleteWrapper
          }
        }}
        options={options}
      />
    </div>
  );
}

export default JobsSearch;
