import React from 'react';
import { Popover } from '@headlessui/react';
import { IoFilterCircleSharp } from 'react-icons/io5';

import Autocomplete from '@/components/Inputs/Autocomplete/Autocomplete';

import { FacetFilterResults } from '@/lib/types/jobsScanner.types';
import { IconButtonProps } from '@/components/Inputs/InputLabel/inputLabel.types';
import { ReturnUseFilterJobsProps } from '@/hooks/useFilterJobs';
import { createAutocompletePropsArr } from './utils';

const filterPopupStyle = {
  popover: 'relative top-0 flex items-center',
  popoverButton: 'border-none focus:border-none focus:outline-none focus-visible:ring-white',
  filterIcon: 'text-filter-400 hover:text-filter-500 ml-1 text-2xl',

  panelContent:
    'absolute top-[2.4rem] xs:left-[50%] z-10 min-h-[8rem] xs:min-w-[17rem]  min-w-[19rem]  rounded-lg bg-white p-4 shadow-lg translate-x-[-95%]',

  autocompleteWrapper: 'relative flex flex-col',
  autocompleteLabel: 'self-end'
};

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
  const autocompletePropsArr = createAutocompletePropsArr(jobsFilters);

  return (
    <Popover className={filterPopupStyle.popover}>
      <Popover.Button className={filterPopupStyle.popoverButton}>
        <IoFilterCircleSharp className={filterPopupStyle.filterIcon} />
      </Popover.Button>
      <Popover.Panel className={filterPopupStyle.panelContent}>
        <div>
          {autocompletePropsArr.map(({ key, label, options }, i) => {
            if (i === 0 && !includeReasonFilters) return <></>;
            const value = filterJobsProps.formValues[key];

            return (
              <Autocomplete
                key={i + key}
                defaultValue={{
                  id: 'default',
                  value: value,
                  title: value
                }}
                label={label}
                setValue={handleSearchValue(key)}
                options={options}
                inputLabelProps={{
                  wrapperInputLabel: {
                    className: filterPopupStyle.autocompleteWrapper
                  },
                  labelProps: {
                    className: filterPopupStyle.autocompleteLabel
                  },
                  IconButtonProps: iconButtonProps
                }}
              />
            );
          })}
        </div>
      </Popover.Panel>
    </Popover>
  );
}

export default FiltersPopup;
