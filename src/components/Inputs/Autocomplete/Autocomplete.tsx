import { ChangeEvent, useState } from 'react';
import { Combobox } from '@headlessui/react';
import { AutocompleteProps } from './autocomplete.types';
import { classNameGenerator } from '@/lib/utils';
import { isActiveStyle } from '../SelectInput/SelectInput';
import { useDebouncedCallback } from 'use-debounce';

const autoCompleteStyle = {
  options:
    'absolute z-50 mt-1 max-h-60 w-full max-w-xs overflow-y-scroll  py-[0.3rem] text-base card ring-1 sm:text-sm',
  label: 'font-semibold',
  input: 'input-custom relative w-full'
};

export default function Autocomplete<V extends string>({
  setValue,
  options,
  optionsProps,
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
  const [selectedOption, setSelectedOption] = useState<V>((defaultValue || '') as V);

  //Handle the select event.
  const handleOnSelect = (value: V) => {
    setValue && setValue(value);
    setSelectedOption(value);
  };
  //Handle input onChange event.
  const handleOnChange = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue && setValue(event.target.value as V);
      if (!event.target.value) {
        setSelectedOption('' as V);
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
          <Combobox.Options
            className={classNameGenerator(autoCompleteStyle.options, optionsProps?.className)}
          >
            {options?.map((option) => (
              <Combobox.Option key={option as string} value={option}>
                {({ active }) => {
                  return <div className={isActiveStyle(active)}>{option as string} </div>;
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
