import { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { AutocompleteProps } from './autocomplete.types';
import { classNameGenerator } from '@/lib/utils';
import { isActiveStyle } from '../SelectInput/SelectInput';

const autoCompleteStyle = {
  options:
    'absolute z-20 mt-1 max-h-60 w-full max-w-xs overflow-hidden rounded-md bg-white py-1 text-base shadow-md  ring-1 sm:text-sm',
  label: 'font-semibold',
  input: 'input-custom'
};

export default function Autocomplete<V>({
  setValue,
  options,
  // multiple,
  label,
  defaultValue,
  inputLabelProps
}: AutocompleteProps<V>) {
  const [selectedOption, setSelectedOption] = useState(defaultValue || options[0]);
  return (
    <Combobox
      value={selectedOption}
      onChange={(value) => {
        setValue && setValue(value.value);

        setSelectedOption(value);
      }}
    >
      <div className={inputLabelProps?.wrapperInputLabel?.className}>
        {label ? (
          <Combobox.Label className={autoCompleteStyle.label} {...inputLabelProps?.labelProps}>
            {label}
          </Combobox.Label>
        ) : (
          <></>
        )}
        <Combobox.Input<'input', { value: V; title: string }[]>
          {...inputLabelProps?.inputProps}
          autoComplete={'off'}
          value={defaultValue?.value as string}
          className={classNameGenerator(autoCompleteStyle.input, inputLabelProps?.inputProps?.className)}
          onChange={(event) => {
            setValue && setValue(event.target.value as V);
          }}
        />
        <div className="relative ">
          <Combobox.Options className={autoCompleteStyle.options}>
            {options.map((option) => (
              <Combobox.Option key={option.id} value={option}>
                {({ active }) => {
                  return <div className={isActiveStyle(active)}>{option.title} </div>;
                }}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
        <div />
      </div>
    </Combobox>
  );
}
