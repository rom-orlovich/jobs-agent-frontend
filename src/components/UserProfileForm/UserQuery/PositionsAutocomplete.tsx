import Autocomplete from '@/components/Inputs/Autocomplete/Autocomplete';

import { useSwrHook } from '@/lib/swr';

import { API_ENDPOINTS, CLIENT_URL } from '@/lib/endpoints';

import React from 'react';
import { AutocompletePropsUserQuery } from './userQuery.types';
import useForm from '@/hooks/useForm';
import { Position } from '@/lib/types/api.types';
import { createURL } from '@/lib/utils';
function PositionsAutocomplete({
  formValues,
  handleSelectionInput,
  inputLabelProps
}: AutocompletePropsUserQuery) {
  const { formValues: positionValue, onChange } = useForm({
    position: ''
  });
  const POSITIONS_URL = createURL([CLIENT_URL, API_ENDPOINTS.POSITIONS], {
    name: positionValue.position
  });

  const { data: positionData } = useSwrHook<{ data: Position[] }>(POSITIONS_URL);
  return (
    <Autocomplete
      defaultValue={formValues.userQuery.position}
      setValue={handleSelectionInput('position')}
      label="תפקיד"
      options={(positionData?.data || []).map((el) => el.positionName)}
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
