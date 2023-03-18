/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Autocomplete from '@/components/Inputs/Autocomplete/Autocomplete';
import { IconButtonProps } from '@/components/Inputs/InputLabel/inputLabel.types';

import FiltersPopup from '@/components/SearchInput/FiltersPopup';

import { JobsTrackingSearchProps } from './JobsTrackingSearch';
import InputLabel from '@/components/Inputs/InputLabel/InputLabel';
import ToggleButton from '@/components/Toggle/ToggleButton';

const JobsSearchFiltersStyle = {
  filters: 'flex flex-col gap-3',
  autocompleteWrapper: 'relative flex flex-col gap-1',
  autocompleteLabel: 'self-end',
  label: 'font-semibold',
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
        <ToggleButton
          labelProps={{
            className: JobsSearchFiltersStyle.label
          }}
          name={'קו"ח נשלחו'}
          checked={formValues.CVwasSent}
          onChange={handleSetFilterValue('CVwasSent')}
        >
          ?קו"ח נשלחו
        </ToggleButton>

        <InputLabel
          labelProps={{
            dir: 'rtl',
            className: JobsSearchFiltersStyle.label
          }}
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
