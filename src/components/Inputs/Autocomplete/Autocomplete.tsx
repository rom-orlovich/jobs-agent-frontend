import { ChangeEvent, useState } from 'react';
import { Combobox } from '@headlessui/react';
import { AutocompleteProps } from './autocomplete.types';
import { classNameGenerator } from '@/lib/utils';
import { isActiveStyle } from '../SelectInput/SelectInput';
import { useDebouncedCallback } from 'use-debounce';
import { Option } from '../SelectInput/selectInput.types';
const autoCompleteStyle = {
  options:
    'absolute z-20 mt-1 max-h-60 w-full max-w-xs overflow-y-scroll rounded-md bg-white py-1 text-base shadow-md ring-1 sm:text-sm',
  label: 'font-semibold',
  input: 'input-custom relative'
};

export default function Autocomplete<V>({
  setValue,
  options,
  // multiple,
  label,
  defaultValue,
  inputLabelProps
}: AutocompleteProps<V>) {
  const iconButton = inputLabelProps?.IconButtonProps ? (
    <button {...inputLabelProps?.IconButtonProps.buttonProps}>
      {inputLabelProps?.IconButtonProps.Icon}
    </button>
  ) : (
    <></>
  );
  const defaultNoValue = {
    title: 'חפש לפי הכל',
    id: `${new Date().getTime()}`,
    value: (inputLabelProps?.inputProps?.value || '') as V
  };

  const [selectedOption, setSelectedOption] = useState<Option<V>>(defaultValue || defaultNoValue);

  //Handle the select event.
  const handleOnSelect = useDebouncedCallback(
    (value: Option<V>) => {
      setValue && setValue(value.value);

      setSelectedOption(value);
    },

    500
  );
  //Handle input onChange event.
  const handleOnChange = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue && setValue(event.target.value as V);
      if (!event.target.value) {
        setSelectedOption(defaultNoValue);
      }
    },

    500
  );

  return (
    <Combobox value={selectedOption} onChange={handleOnSelect}>
      <div className={inputLabelProps?.wrapperInputLabel?.className}>
        {label ? (
          <Combobox.Label className={autoCompleteStyle.label} {...inputLabelProps?.labelProps}>
            {label}
          </Combobox.Label>
        ) : (
          <></>
        )}
        <Combobox.Input<'input', { value: V; title: string }>
          {...inputLabelProps?.inputProps}
          autoComplete={'off'}
          value={inputLabelProps?.inputProps?.value}
          displayValue={(selectedOption) => selectedOption.value as string}
          className={classNameGenerator(autoCompleteStyle.input, inputLabelProps?.inputProps?.className)}
          onChange={handleOnChange}
        />
        <div className="relative">
          <Combobox.Options className={autoCompleteStyle.options}>
            {options?.map((option) => (
              <Combobox.Option className={'px-2'} key={option.id} value={option}>
                {({ active }) => {
                  return <div className={isActiveStyle(active)}>{option.title} </div>;
                }}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
        {iconButton}
        <div />
      </div>
    </Combobox>
  );
}
