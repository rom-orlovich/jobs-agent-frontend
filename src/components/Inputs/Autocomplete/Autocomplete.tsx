import { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { AutocompleteProps } from './autocomplete.types';
export default function Autocomplete<V>({
  setValue,
  options,
  multiple,
  label,
  defaultValue
}: AutocompleteProps<V>) {
  const [selectedOption, setSelectedOption] = useState(multiple ? [] : options[0] || defaultValue);

  return (
    <Combobox
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      multiple={(multiple ? multiple : false) as any}
      value={selectedOption}
      onChange={(value) => {
        if (!multiple && !Array.isArray(value) && typeof value !== 'object') {
          setValue && setValue(value);
        }

        setSelectedOption(value);
      }}
    >
      {label ? <Combobox.Label className={'font-medium'}>{label}</Combobox.Label> : <></>}
      <div>
        <Combobox.Input<'input', { value: V; title: string }[]>
          displayValue={
            multiple
              ? (values) => {
                  return values.map((el) => el.title).join(', ');
                }
              : undefined
          }
          autoComplete={'off'}
          value={defaultValue?.value as string}
          className="input-custom"
          onChange={(event) => {
            setValue && setValue(event.target.value as V);
          }}
        />

        <div className="relative ">
          <Combobox.Options
            className={'absolute z-50 flex w-full flex-col items-center bg-slate-100 shadow-md'}
          >
            {options.map((option) => (
              <Combobox.Option key={option.id} value={multiple ? option : option.value}>
                {({}) => {
                  return <div>{option.title} </div>;
                }}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </div>
    </Combobox>
  );
}
