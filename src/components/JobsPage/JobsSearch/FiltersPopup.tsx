import React from 'react';
import { Popover } from '@headlessui/react';
import { IoFilterCircleSharp } from 'react-icons/io5';

import Autocomplete from '@/components/Inputs/Autocomplete/Autocomplete';
import { Option } from '@/components/Inputs/SelectInput/selectInput.types';
import { FacetFilterResults } from '@/lib/types/jobsScanner.types';
import { IconButtonProps } from '@/components/Inputs/InputLabel/inputLabel.types';
import { ReturnUseFilterJobsProps } from '@/hooks/useFilterJobs';
import { createAutocompleteOptions } from './utils';

function FiltersPopup({
  iconButtonProps,
  filterJobsProps,
  jobsFilters,
  includeReasonFilters
}: {
  iconButtonProps: IconButtonProps;
  filterJobsProps: ReturnUseFilterJobsProps;
  jobsFilters: FacetFilterResults;
  includeReasonFilters: boolean;
}) {
  const { handleSearchValue } = filterJobsProps;
  console.log(jobsFilters);
  const reasonsOptions: Option<string>[] = createAutocompleteOptions(jobsFilters.reasons);
  const fromOptions: Option<string>[] = createAutocompleteOptions(jobsFilters.from);
  const companiesOptions: Option<string>[] = createAutocompleteOptions(jobsFilters.companies);
  const locationOptions: Option<string>[] = createAutocompleteOptions(jobsFilters.locations);

  // const optionsReasons: Option<string>[] = jobsFilters?.reasons?.map((reason, i) => ({
  //   id: reason + i,
  //   title: reason,
  //   value: reason
  // }));
  const filterPopupStyle = {
    popover: 'relative top-0 flex items-center',
    popoverButton: 'border-none focus:border-none focus:outline-none focus-visible:ring-white',
    filterIcon: 'text-filter-400 hover:text-filter-500 ml-1 text-2xl',

    panelContent:
      'absolute top-[2.4rem] xs:left-[50%] z-10 min-h-[8rem] xs:min-w-[17rem]   min-w-[19rem]  rounded-lg bg-white p-4 shadow-lg translate-x-[-95%]'
  };

  return (
    <Popover className={filterPopupStyle.popover}>
      <Popover.Button className={filterPopupStyle.popoverButton}>
        <IoFilterCircleSharp className={filterPopupStyle.filterIcon} />
      </Popover.Button>
      <Popover.Panel className={filterPopupStyle.panelContent}>
        <div dir="rtl" className="">
          {includeReasonFilters && (
            <Autocomplete
              defaultValue={{
                id: 'default',
                value: filterJobsProps.formValues.reason,
                title: filterJobsProps.formValues.reason
              }}
              label="חפש עפ התאמה"
              setValue={handleSearchValue('reason')}
              options={reasonsOptions}
              inputLabelProps={{
                IconButtonProps: iconButtonProps
              }}
            />
          )}
          {includeReasonFilters && (
            <Autocomplete
              defaultValue={{
                id: 'default',
                value: filterJobsProps.formValues.from,
                title: filterJobsProps.formValues.from
              }}
              label="חפש עפ אתר"
              setValue={handleSearchValue('from')}
              options={fromOptions}
              inputLabelProps={{
                IconButtonProps: iconButtonProps
              }}
            />
          )}
          {includeReasonFilters && (
            <Autocomplete
              defaultValue={{
                id: 'default',
                value: filterJobsProps.formValues.company,
                title: filterJobsProps.formValues.company
              }}
              label="חפש עפ חברה"
              setValue={handleSearchValue('company')}
              options={companiesOptions}
              inputLabelProps={{
                IconButtonProps: iconButtonProps
              }}
            />
          )}
          {includeReasonFilters && (
            <Autocomplete
              defaultValue={{
                id: 'default',
                value: filterJobsProps.formValues.location,
                title: filterJobsProps.formValues.location
              }}
              label="חפש עפ מיקום"
              setValue={handleSearchValue('location')}
              options={locationOptions}
              inputLabelProps={{
                IconButtonProps: iconButtonProps
              }}
            />
          )}
        </div>
      </Popover.Panel>
    </Popover>
  );
}

export default FiltersPopup;
