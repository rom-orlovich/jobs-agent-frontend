import Autocomplete from '@/components/Inputs/Autocomplete/Autocomplete';

import { useSwrHook } from '@/lib/swr';

import { API_ENDPOINTS } from '@/lib/endpoints';
import { Position } from '@/lib/types/api.types';
import React from 'react';
import { AutocompletePropsUserQuery } from './userQuery.types';
import useForm from '@/hooks/useForm';
function PositionsAutocomplete({
  formValues,
  handleSelectionInput,
  inputLabelProps
}: AutocompletePropsUserQuery) {
  const { formValues: positionValue, onChange } = useForm({
    position: ''
  });
  const { data: positionData } = useSwrHook<{ data: Position[] }>(
    `/${API_ENDPOINTS.POSITIONS}?name=${positionValue.position}`
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
      inputLabelProps={{
        ...inputLabelProps,
        inputProps: {
          id: 'position',
          onChange
        }
      }}
    />
  );
}

export default PositionsAutocomplete;
