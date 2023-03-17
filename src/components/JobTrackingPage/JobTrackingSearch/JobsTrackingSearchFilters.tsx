import React from 'react';
import Autocomplete from '@/components/Inputs/Autocomplete/Autocomplete';
import { IconButtonProps } from '@/components/Inputs/InputLabel/inputLabel.types';

import FiltersPopup from '@/components/SearchInput/FiltersPopup';

import { JobsTrackingSearchProps } from './JobsTrackingSearch';

const JobsSearchFiltersStyle = {
  filters: 'flex flex-col gap-2',
  autocompleteWrapper: 'relative flex flex-col gap-1',
  autocompleteLabel: 'self-end',
  popupInputIcon: 'text-blue-300 absolute  text-xl top-[53%] right-1'
};

interface JobsSearchFiltersProps extends JobsTrackingSearchProps {
  iconButtonProps: IconButtonProps;
}

function JobsTrackingSearchFilters({
  iconButtonProps,
  filtersTrackingJobsProps,
  jobsTrackingFilters
}: JobsSearchFiltersProps) {
  const { formValues, handleOnChangeFilterValue } = filtersTrackingJobsProps;

  return (
    <FiltersPopup>
      <div className={JobsSearchFiltersStyle.filters}>
        <Autocomplete
          defaultValue={{
            id: 'default',
            value: formValues.currentStageName,
            title: formValues.currentStageName
          }}
          label={'שלב נוכחי'}
          setValue={handleOnChangeFilterValue('currentStageName')}
          options={jobsTrackingFilters.currentStageNames}
          inputLabelProps={{
            wrapperInputLabel: {
              className: JobsSearchFiltersStyle.autocompleteWrapper
            },
            labelProps: {
              className: JobsSearchFiltersStyle.autocompleteLabel
            },
            IconButtonProps: {
              ...iconButtonProps,
              buttonProps: {
                className: JobsSearchFiltersStyle.popupInputIcon
              }
            }
          }}
        />
      </div>
    </FiltersPopup>
  );
}

export default JobsTrackingSearchFilters;
