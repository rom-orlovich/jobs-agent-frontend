import Autocomplete from '@/components/Inputs/Autocomplete/Autocomplete';
import useForm from '@/hooks/useForm';

import { API_ENDPOINTS } from '@/lib/endpoints';
import { useSwrHook } from '@/lib/swr';
import { Location } from '@/lib/types/api.types';

import React from 'react';
import { AutocompletePropsUserQuery } from './userQuery.types';
function LocationsAutocomplete({
  formValues,
  handleSelectionInput,
  inputLabelProps
}: AutocompletePropsUserQuery) {
  const { formValues: locationValue, onChange } = useForm({
    location: ''
  });
  const { data: locationData } = useSwrHook<{ data: Location[] }>(
    `/${API_ENDPOINTS.LOCATIONS}?name=${locationValue.location}`
  );
  console.log(formValues.userQuery.location);
  return (
    <Autocomplete
      defaultValue={formValues.userQuery.location}
      setValue={handleSelectionInput('location')}
      label="עיר"
      options={(locationData?.data || []).map((el) => el.locationName)}
      inputLabelProps={{
        ...inputLabelProps,
        inputProps: {
          id: 'location',
          onChange
        }
      }}
    />
  );
}

export default LocationsAutocomplete;
