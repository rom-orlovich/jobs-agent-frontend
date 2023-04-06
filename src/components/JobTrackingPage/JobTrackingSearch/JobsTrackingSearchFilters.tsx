/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import FiltersPopup, { filtersStyle } from '@/components/SearchInput/FiltersPopup';

import { JobsTrackingSearchProps } from './JobsTrackingSearch';
import InputLabel from '@/components/Inputs/InputLabel/InputLabel';
import SelectCVStatus from './SelectCVStatus';
import AutocompleteFilter from '@/components/SearchInput/AutocompleteFilter';

function JobsTrackingSearchFilters({
  filtersTrackingJobsProps,
  jobsTrackingFilters
}: JobsTrackingSearchProps) {
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
        <AutocompleteFilter
          defaultValue={formValues.currentStageName}
          label={'שלב נוכחי'}
          setValue={handleSetFilterValue('currentStageName')}
          options={jobsTrackingFilters.currentStageNames}
        />
        <AutocompleteFilter
          defaultValue={formValues.currentStageName}
          label={'חפש עפ חברה'}
          setValue={handleSetFilterValue('company')}
          options={jobsTrackingFilters.companies}
        />
      </div>
    </FiltersPopup>
  );
}

export default JobsTrackingSearchFilters;
