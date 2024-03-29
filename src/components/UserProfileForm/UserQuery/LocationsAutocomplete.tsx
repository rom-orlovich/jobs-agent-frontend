import Autocomplete from '@/components/Inputs/Autocomplete/Autocomplete';
import useForm from '@/hooks/useForm';

import { API_ENDPOINTS, CLIENT_URL } from '@/lib/endpoints';
import { useSwrHook } from '@/lib/swr';
import { Location } from '@/lib/types/api.types';
import { createURL } from '@/lib/utils';

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
  const LOCATIONS_URL = createURL([CLIENT_URL, API_ENDPOINTS.LOCATIONS], {
    name: locationValue.location
  });
  const { data: locationData } = useSwrHook<{ data: Location[] }>(LOCATIONS_URL);

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
