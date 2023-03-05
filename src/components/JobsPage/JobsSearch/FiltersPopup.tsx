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
  autocompleteList: 'flex flex-col gap-2',
  autocompleteWrapper: 'relative flex flex-col gap-1',
  autocompleteLabel: 'self-end',
  popupInputIcon: 'text-blue-300 absolute  text-xl top-[53%] right-1'
};

interface FiltersPopupProps {
  iconButtonProps: IconButtonProps;
  filterJobsProps: ReturnUseFilterJobsProps;
  jobsFilters: FacetFilterResults;
  includeReasonFilters: boolean;
}

function FiltersPopup({
  iconButtonProps,
  filterJobsProps,
  jobsFilters,
  includeReasonFilters
}: FiltersPopupProps) {
  const { handleSearchValue } = filterJobsProps;
  const autocompletePropsArr = createAutocompletePropsArr(jobsFilters);

  return (
    <Popover className={filterPopupStyle.popover}>
      <Popover.Button className={filterPopupStyle.popoverButton}>
        <IoFilterCircleSharp className={filterPopupStyle.filterIcon} />
      </Popover.Button>
      <Popover.Panel className={filterPopupStyle.panelContent}>
        <ul className={filterPopupStyle.autocompleteList}>
          {autocompletePropsArr.map(({ key, label, options }, i) => {
            if (i === 0 && !includeReasonFilters) return <li key={key + i}></li>;
            const value = filterJobsProps.formValues[key];

            return (
              <li key={i + key + Date.now()}>
                <Autocomplete
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
                    IconButtonProps: {
                      ...iconButtonProps,
                      buttonProps: {
                        className: filterPopupStyle.popupInputIcon
                      }
                    }
                  }}
                />
              </li>
            );
          })}
        </ul>
      </Popover.Panel>
    </Popover>
  );
}

export default FiltersPopup;
