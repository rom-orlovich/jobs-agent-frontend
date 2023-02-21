import Autocomplete from '@/components/Inputs/Autocomplete/Autocomplete';
import { useSwrHook } from '@/hooks/useSwr';
import { FormComponents } from '@/hooks/useUserDetailsForm/useUserDetailsForm';
import { API_ENDPOINTS } from '@/lib/endpoints';
import { Position } from '@/lib/types/api.types';
import React from 'react';
function PositionsAutocomplete({ formValues, handleSelectionInput }: FormComponents<unknown>) {
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
    />
  );
}

export default PositionsAutocomplete;
