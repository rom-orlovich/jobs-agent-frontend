import { Option } from '@/components/Inputs/SelectInput/selectInput.types';

import { ReturnUseFilterJobsProps } from '@/hooks/useFilterJobs';

import { FacetFilterResults } from '@/lib/types/jobsScanner.types';

import React from 'react';
import { BiSearch } from 'react-icons/bi';

import Autocomplete from '../../Inputs/Autocomplete/Autocomplete';
import FiltersPopup from './FiltersPopup';

function JobsSearch({
  filterJobsProps,
  jobsFilters,
  includeReasonFilter
}: {
  jobsFilters: FacetFilterResults;
  filterJobsProps: ReturnUseFilterJobsProps;
  includeReasonFilter: boolean;
}) {
  const { handleSearchValue } = filterJobsProps;
  const titles: Option<string>[] = jobsFilters?.titles?.map((title, i) => ({
    id: title + i,
    title: title,
    value: title
  }));
  const jobsSearchStyle = {
    jobSearchContainer: 'flex xs:justify-start w-full',
    autocompleteWrapper: 'relative w-fit items-center',
    input: 'py-1 sm:min-w-[15rem] min-w-[20rem]',
    icon: 'text-blue-300 absolute right-2  text-xl top-[30%]',
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
        defaultValue={{
          id: 'default',
          value: filterJobsProps.formValues.title,
          title: filterJobsProps.formValues.title
        }}
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
        options={titles}
      />

      {includeReasonFilter && (
        <FiltersPopup
          jobsFilters={jobsFilters}
          iconButtonProps={IconButtonProps}
          filterJobsProps={filterJobsProps}
        />
      )}
    </div>
  );
}

export default JobsSearch;
