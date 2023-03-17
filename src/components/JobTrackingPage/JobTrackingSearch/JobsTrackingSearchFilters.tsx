import React from 'react';
import Autocomplete from '@/components/Inputs/Autocomplete/Autocomplete';
import { IconButtonProps } from '@/components/Inputs/InputLabel/inputLabel.types';

import FiltersPopup from '@/components/SearchInput/FiltersPopup';

import { JobsTrackingSearchProps } from './JobsTrackingSearch';
import InputLabel from '@/components/Inputs/InputLabel/InputLabel';

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
  const { formValues, handleSetFilterValue, handleOnChange } = filtersTrackingJobsProps;

  return (
    <FiltersPopup>
      <div className={JobsSearchFiltersStyle.filters}>
        <InputLabel
          inputProps={{
            type: 'date',
            value: formValues.afterUpdateDate,
            onChange: handleOnChange('afterUpdateDate')
          }}
        >
          עודכן אחרי
        </InputLabel>
        <Autocomplete
          defaultValue={{
            id: 'default',
            value: formValues.currentStageName,
            title: formValues.currentStageName
          }}
          label={'שלב נוכחי'}
          setValue={handleSetFilterValue('currentStageName')}
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
