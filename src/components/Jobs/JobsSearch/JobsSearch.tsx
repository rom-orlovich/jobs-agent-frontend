import { Option } from '@/components/Inputs/SelectInput/selectInput.types';
import { useAuthContext } from '@/context/UserContext';
import { ReturnUseFilterJobsProps } from '@/hooks/useFilterJobs/useFilterJobs';
import { useSwrHook } from '@/hooks/useSwr';

import { createJobsURl, getJobsExistData } from '@/lib/jobs.utils';
import { ResponseGetJobs } from '@/lib/jobsScanner.types';

import React from 'react';
import { BiSearch } from 'react-icons/bi';

import Autocomplete from '../../Inputs/Autocomplete/Autocomplete';
import FiltersPopup from './FiltersPopup';

function JobsSearch(filterJobsProps: ReturnUseFilterJobsProps) {
  const { handleSearchValue, formValues } = filterJobsProps;
  const { userProfileData } = useAuthContext();

  const { data } = useSwrHook<ResponseGetJobs>(
    createJobsURl(userProfileData.userID || '', {
      title: formValues.title,
      reason: formValues.reason
    })
  );
  const curData = getJobsExistData(data);

  const options: Option<string>[] = curData?.jobs.map((job, i) => ({
    id: job.jobID + i,
    title: job.title,
    value: job.title
  }));
  const jobsSearchStyle = {
    jobSearchContainer: 'flex justify-start',
    autocompleteWrapper: 'relative w-fit items-center',
    icon: 'text-blue-300 absolute right-2  text-xl top-[30%]',
    input: 'py-1 min-w-[15rem]',
    filterIcon: 'text-filter-400 hover:text-filter-500 ml-1 text-2xl'
  };
  const IconButtonProps = {
    Icon: <BiSearch />,
    buttonProps: {
      className: jobsSearchStyle.icon
    }
  };
  return (
    <div dir="ltr" className={jobsSearchStyle.jobSearchContainer}>
      <Autocomplete
        setValue={handleSearchValue('title')}
        inputLabelProps={{
          IconButtonProps: IconButtonProps,
          inputProps: {
            className: jobsSearchStyle.input
          },
          wrapperInputLabel: {
            className: jobsSearchStyle.autocompleteWrapper
          }
        }}
        options={options}
      />

      <FiltersPopup
        jobs={curData.jobs}
        iconButtonProps={IconButtonProps}
        filterJobsProps={filterJobsProps}
      />
    </div>
  );
}

export default JobsSearch;
