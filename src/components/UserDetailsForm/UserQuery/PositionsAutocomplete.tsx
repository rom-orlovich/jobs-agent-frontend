import Autocomplete from '@/components/Inputs/Autocomplete/Autocomplete';

import { useSwrHook } from '@/hooks/useSwr';

import { API_ENDPOINTS } from '@/lib/endpoints';
import { Position } from '@/lib/types/api.types';
import React from 'react';
import { AutocompletePropsUserQuery } from './userQuery.types';
function PositionsAutocomplete({
  formValues,
  handleSelectionInput,
  inputLabelProps
}: AutocompletePropsUserQuery) {
  const { data: positionData } = useSwrHook<{ data: Position[] }>(
    `/${API_ENDPOINTS.POSITIONS}?name=${formValues.userQuery.position}`
  );
  return (
    <Autocomplete
      defaultValue={{
        id: `default-position`,
        title: formValues.userQuery.position,
        value: formValues.userQuery.position
      }}
      setValue={handleSelectionInput('position')}
      label="תפקיד"
      options={(positionData?.data || []).map((el) => ({
        id: el.positionID,
        title: el.positionName,
        value: el.positionName
      }))}
      inputLabelProps={inputLabelProps}
    />
  );
}

export default PositionsAutocomplete;
