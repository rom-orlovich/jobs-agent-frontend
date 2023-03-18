/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Autocomplete from '@/components/Inputs/Autocomplete/Autocomplete';
import { IconButtonProps } from '@/components/Inputs/InputLabel/inputLabel.types';

import FiltersPopup, { filtersStyle } from '@/components/SearchInput/FiltersPopup';

import { JobsTrackingSearchProps } from './JobsTrackingSearch';
import InputLabel from '@/components/Inputs/InputLabel/InputLabel';

import SelectInput from '@/components/Inputs/SelectInput/SelectInput';
import { Option } from '@/components/Inputs/SelectInput/selectInput.types';

interface JobsSearchFiltersProps extends JobsTrackingSearchProps {
  iconButtonProps: IconButtonProps;
}

function JobsTrackingSearchFilters({
  iconButtonProps,
  filtersTrackingJobsProps,
  jobsTrackingFilters
}: JobsSearchFiltersProps) {
  const { formValues, handleSetFilterValue, handleOnChange } = filtersTrackingJobsProps;
  const STATUS_CV_OPTIONS: Option<boolean | undefined>[] = [
    {
      id: 'הצג הכל',
      title: 'הצג הכל',
      value: undefined
    },
    {
      id: 'נשלחו',
      title: 'נשלחו',
      value: true
    },
    {
      id: 'לא נשלחו',
      title: 'לא נשלחו',
      value: false
    }
  ];
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
        <SelectInput
          setValue={handleSetFilterValue('CVwasSent')}
          defaultValue={STATUS_CV_OPTIONS[0]}
          optionsElProps={{
            className: 'text-right'
          }}
          buttonProps={{
            className: 'w-full text-right'
          }}
          labelProps={{
            title: 'סטטוס קו"ח'
          }}
          options={STATUS_CV_OPTIONS}
          selectInputWrapper={{
            dir: 'rtl',
            className: 'w-full'
          }}
        />

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
