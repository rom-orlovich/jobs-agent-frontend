/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import FiltersPopup, { filtersStyle } from '@/components/SearchInput/FiltersPopup';

import { HistoryQueriesSearchProps } from './HistoryQueriesSearch';
import InputLabel from '@/components/Inputs/InputLabel/InputLabel';
import AutocompleteFilter from '@/components/SearchInput/AutocompleteFilter';
function HistoryQueriesSearchFilters({
  historyQueriesSearchFilters,
  historyQueriesSearchProps
}: HistoryQueriesSearchProps) {
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
        <AutocompleteFilter
          defaultValue={formValues.location}
          label={'מיקום'}
          setValue={handleSetFilterValue('location')}
          options={historyQueriesSearchFilters.locations}
        />
      </div>
    </FiltersPopup>
  );
}

export default HistoryQueriesSearchFilters;
