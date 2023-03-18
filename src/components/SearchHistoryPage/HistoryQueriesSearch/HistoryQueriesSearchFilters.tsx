/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Autocomplete from '@/components/Inputs/Autocomplete/Autocomplete';
import { IconButtonProps } from '@/components/Inputs/InputLabel/inputLabel.types';

import FiltersPopup from '@/components/SearchInput/FiltersPopup';

import { HistoryQueriesSearchProps } from './HistoryQueriesSearch';
import InputLabel from '@/components/Inputs/InputLabel/InputLabel';
const historyQueriesStyle = {
  filters: 'flex flex-col gap-3',
  autocompleteWrapper: 'relative flex flex-col gap-1',
  autocompleteLabel: 'self-end',
  label: 'font-semibold',
  popupInputIcon: 'text-blue-300 absolute  text-xl top-[53%] right-1'
};

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
      <div className={historyQueriesStyle.filters}>
        <InputLabel
          labelProps={{
            dir: 'rtl',
            className: historyQueriesStyle.label
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
              className: historyQueriesStyle.autocompleteWrapper
            },
            labelProps: {
              className: historyQueriesStyle.autocompleteLabel
            },
            IconButtonProps: {
              ...iconButtonProps,
              buttonProps: {
                className: historyQueriesStyle.popupInputIcon
              }
            }
          }}
        />
      </div>
    </FiltersPopup>
  );
}

export default HistoryQueriesSearchFilters;
