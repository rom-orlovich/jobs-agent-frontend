import { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { AutocompleteProps } from './autocomplete.types';
import { classNameGenerator } from '@/lib/utils';

const autoCompleteStyle = {
  options: 'absolute z-50 flex w-full flex-col items-center bg-slate-100 shadow-md',
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
                {({}) => {
                  return <div>{option.title} </div>;
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
