import React from 'react';
import Autocomplete from '../Inputs/Autocomplete/Autocomplete';
import { AutocompleteProps } from '../Inputs/Autocomplete/autocomplete.types';
import { IconButtonProps } from './SearchInput';

const autocompleteFilterStyle = {
  autocompleteWrapper: 'relative flex flex-col gap-1',
  autocompleteLabel: 'self-end',
  label: 'font-semibold',
  icon: 'text-blue-300 absolute  text-xl top-[53%] right-1'
};
function AutocompleteFilter({
  defaultValue,
  label,
  options,
  setValue,
  ...rest
}: AutocompleteProps<string>) {
  return (
    <Autocomplete
      defaultValue={defaultValue}
      label={label}
      setValue={setValue}
      options={options}
      inputLabelProps={{
        wrapperInputLabel: {
          className: autocompleteFilterStyle.autocompleteWrapper
        },
        labelProps: {
          className: autocompleteFilterStyle.autocompleteLabel
        },
        IconButtonProps: {
          ...IconButtonProps,
          buttonProps: {
            className: autocompleteFilterStyle.icon
          }
        }
      }}
      {...rest}
    />
  );
}

export default AutocompleteFilter;
