import { Option } from '@/components/Inputs/SelectInput/selectInput.types';

import SearchInput, { IconButtonProps } from '@/components/SearchInput/SearchInput';
import { ReturnUseHistoryQueriesFilters } from '@/hooks/useFiltersHooks/useHistoryQueriesFilters';

import React from 'react';
import HistoryQueriesSearchFilters from './HistoryQueriesSearchFilters';
export interface HistoryQueriesFiltersArr {
  positions: Option<string>[];
  locations: Option<string>[];
}
export interface HistoryQueriesSearchProps {
  historyQueriesSearchFilters: HistoryQueriesFiltersArr;
  historyQueriesSearchProps: ReturnUseHistoryQueriesFilters;
}
function HistoryQueriesSearch({
  historyQueriesSearchFilters,
  historyQueriesSearchProps
}: HistoryQueriesSearchProps) {
  return (
    <SearchInput
      filtersJobsHookReturn={historyQueriesSearchProps}
      mainSearchInputProps={{
        options: historyQueriesSearchFilters.positions,
        defaultValue: {
          id: 'default1',
          value: historyQueriesSearchProps.formValues.position,
          title: historyQueriesSearchProps.formValues.position
        },
        key: 'position'
      }}
    >
      <HistoryQueriesSearchFilters
        iconButtonProps={IconButtonProps}
        historyQueriesSearchProps={historyQueriesSearchProps}
        historyQueriesSearchFilters={historyQueriesSearchFilters}
      />
    </SearchInput>
  );
}

export default HistoryQueriesSearch;
