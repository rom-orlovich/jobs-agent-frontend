/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Autocomplete from '@/components/Inputs/Autocomplete/Autocomplete';
import { IconButtonProps } from '@/components/Inputs/InputLabel/inputLabel.types';

import FiltersPopup, { filtersStyle } from '@/components/SearchInput/FiltersPopup';

import { JobsTrackingSearchProps } from './JobsTrackingSearch';
import InputLabel from '@/components/Inputs/InputLabel/InputLabel';
import SelectCVStatus from './SelectCVStatus';

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
      <div className={filtersStyle.filters}>
        <InputLabel
          labelProps={{
            dir: 'rtl',
            className: filtersStyle.label
          }}
          inputProps={{
            type: 'date',

            value: formValues.afterUpdateDate,
            onChange: handleOnChange('afterUpdateDate')
          }}
        >
          עודכן אחרי
        </InputLabel>
        <SelectCVStatus {...filtersTrackingJobsProps} />
        <Autocomplete
          defaultValue={formValues.currentStageName}
          label={'שלב נוכחי'}
          setValue={handleSetFilterValue('currentStageName')}
          options={jobsTrackingFilters.currentStageNames}
          inputLabelProps={{
            wrapperInputLabel: {
              className: filtersStyle.autocompleteWrapper
            },
            labelProps: {
              className: filtersStyle.autocompleteLabel
            },
            IconButtonProps: {
              ...iconButtonProps,
              buttonProps: {
                className: filtersStyle.popupInputIcon
              }
            }
          }}
        />
      </div>
    </FiltersPopup>
  );
}

export default JobsTrackingSearchFilters;
