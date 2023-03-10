import { ChangeEvent, useState } from 'react';
import { Combobox } from '@headlessui/react';
import { AutocompleteProps } from './autocomplete.types';
import { classNameGenerator } from '@/lib/utils';
import { isActiveStyle } from '../SelectInput/SelectInput';
import { useDebouncedCallback } from 'use-debounce';
import { Option } from '../SelectInput/selectInput.types';
const autoCompleteStyle = {
  options:
    'absolute z-50 mt-1 max-h-60 w-full max-w-xs overflow-y-scroll  py-1 text-base card ring-1 sm:text-sm',
  label: 'font-semibold',
  input: 'input-custom relative w-full'
};

export default function Autocomplete<V>({
  setValue,
  options,

  label,
  defaultValue,
  inputLabelProps
}: AutocompleteProps<V>) {
  const iconButton = inputLabelProps?.IconButtonProps ? (
    <span {...inputLabelProps?.IconButtonProps.buttonProps}>
      {inputLabelProps?.IconButtonProps.Icon}
    </span>
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
  const handleOnSelect = (value: Option<V>) => {
    setValue && setValue(value.value);

    setSelectedOption(value);
  };
  //Handle input onChange event.
  const handleOnChange = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue && setValue(event.target.value as V);
      if (!event.target.value) {
        setSelectedOption(defaultNoValue);
      }
    },

    1000
  );

  return (
    <Combobox value={selectedOption} onChange={handleOnSelect}>
      <div
        dir={inputLabelProps?.wrapperInputLabel?.dir}
        className={inputLabelProps?.wrapperInputLabel?.className}
      >
        {label ? (
          <Combobox.Label
            {...inputLabelProps?.labelProps}
            className={classNameGenerator(
              autoCompleteStyle.label,
              inputLabelProps?.labelProps?.className
            )}
          >
            {label}
          </Combobox.Label>
        ) : (
          <></>
        )}
        <Combobox.Button>
          <Combobox.Input<'input', { value: V; title: string }>
            {...inputLabelProps?.inputProps}
            autoComplete={'off'}
            value={inputLabelProps?.inputProps?.value}
            displayValue={(selectedOption) => selectedOption.value as string}
            className={classNameGenerator(
              autoCompleteStyle.input,
              inputLabelProps?.inputProps?.className
            )}
            onChange={
              inputLabelProps?.inputProps?.onChange
                ? inputLabelProps?.inputProps?.onChange
                : handleOnChange
            }
          />
          {iconButton}
        </Combobox.Button>
        <div className="relative">
          <Combobox.Options className={autoCompleteStyle.options}>
            {options?.map((option) => (
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
