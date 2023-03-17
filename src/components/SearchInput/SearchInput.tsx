/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReturnUseFiltersProps } from '@/hooks/useFilters';
import { GenericRecord } from '@/lib/types/types';
import React, { PropsWithChildren } from 'react';
import { BiSearch } from 'react-icons/bi';
import Autocomplete from '../Inputs/Autocomplete/Autocomplete';
import { Option } from '../Inputs/SelectInput/selectInput.types';

export const jobsSearchStyle = {
  jobSearchContainer: 'flex xs:justify-start w-full',
  autocompleteWrapper: 'relative w-fit items-center',
  input: 'py-1 min-w-[15rem]',
  icon: 'text-blue-300 absolute right-2  text-xl top-[25%]',
  filterIcon: 'text-filter-400 hover:text-filter-500 ml-1 text-2xl'
};

export const IconButtonProps = {
  Icon: <BiSearch />,
  buttonProps: {
    className: jobsSearchStyle.icon
  }
};

/**
 * @param FV The filters hook inputs values props.
 * @param HRV The filter hook's return values
 */
interface MainSearchInputProps<FV extends GenericRecord<any>> {
  defaultValue?: Option<string>;
  key: keyof ReturnUseFiltersProps<FV>['formValues'];
  options: Option<string>[];
}
function SearchInput<FV extends GenericRecord<any>>({
  mainSearchInputProps,
  filtersJobsHookReturn,
  children
}: {
  // filtersValue: FV;
  mainSearchInputProps: MainSearchInputProps<FV>;
  filtersJobsHookReturn: ReturnUseFiltersProps<FV>;
} & PropsWithChildren) {
  const { key, defaultValue, options } = mainSearchInputProps;
  const { handleSearchValue } = filtersJobsHookReturn;

  return (
    <div dir="ltr" className={jobsSearchStyle.jobSearchContainer}>
      <Autocomplete
        defaultValue={defaultValue}
        setValue={handleSearchValue(key)}
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
      {children}
      {/* <JobsSearchFilters
        includeReasonFilters={includeReasonFilters}
        jobsFilters={jobsFilters}
        iconButtonProps={{
          ...IconButtonProps
        }}
        filterJobsProps={filterJobsProps}
      /> */}
    </div>
  );
}

export default SearchInput;
