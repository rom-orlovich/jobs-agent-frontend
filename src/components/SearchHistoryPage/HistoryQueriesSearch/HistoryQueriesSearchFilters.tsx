/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Autocomplete from '@/components/Inputs/Autocomplete/Autocomplete';
import { IconButtonProps } from '@/components/Inputs/InputLabel/inputLabel.types';

import FiltersPopup, { filtersStyle } from '@/components/SearchInput/FiltersPopup';

import { HistoryQueriesSearchProps } from './HistoryQueriesSearch';
import InputLabel from '@/components/Inputs/InputLabel/InputLabel';
interface HistoryQueriesSearchFiltersProps extends HistoryQueriesSearchProps {
  iconButtonProps: IconButtonProps;
}

function HistoryQueriesSearchFilters({
  iconButtonProps,
  historyQueriesSearchFilters,
  historyQueriesSearchProps
}: HistoryQueriesSearchFiltersProps) {
  const { formValues, handleSetFilterValue, handleOnChange } = historyQueriesSearchProps;

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
        <Autocomplete
          defaultValue={formValues.location}
          label={'מיקום'}
          setValue={handleSetFilterValue('location')}
          options={historyQueriesSearchFilters.locations}
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

export default HistoryQueriesSearchFilters;
