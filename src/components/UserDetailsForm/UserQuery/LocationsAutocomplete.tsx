import Autocomplete from '@/components/Inputs/Autocomplete/Autocomplete';
import { useSwrHook } from '@/hooks/useSwr';
import { FormComponents } from '@/hooks/useUserDetailsForm/useUserDetailsForm';
import { API_ENDPOINTS } from '@/lib/endpoints';
import { Location } from '@/lib/types/api.types';

import React from 'react';
function LocationsAutocomplete({ formValues, handleSelectionInput }: FormComponents<unknown>) {
  const { data: locationData } = useSwrHook<{ data: Location[] }>(
    `/${API_ENDPOINTS.LOCATIONS}?name=${formValues.userQuery.location}`
  );
  return (
    <Autocomplete
      defaultValue={{
        id: `default-location`,
        title: formValues.userQuery.location,
        value: formValues.userQuery.location
      }}
      setValue={handleSelectionInput('location')}
      label="עיר"
      options={(locationData?.data || []).map((el) => ({
        id: el.locationID,
        title: el.locationName,
        value: el.locationName
      }))}
    />
  );
}

export default LocationsAutocomplete;
