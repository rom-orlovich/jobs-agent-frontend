import { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { AutocompleteProps } from './autocomplete';
export default function Autocomplete<V>({
  setValue,
  options,
  multiple,
  label,
  defaultValue
}: AutocompleteProps<V>) {
  const [selectedOption, setSelectedOption] = useState(multiple ? [] : options[0] || defaultValue);
  const [query, setQuery] = useState('');

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
          return option.title.toLowerCase().includes(query.toLowerCase());
        });

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
          className="input-custom"
          onChange={(event) => {
            setQuery(event.target.value);
            setValue && setValue(event.target.value as V);
          }}
        />

        <div className="relative ">
          <Combobox.Options
            className={'absolute z-50 flex w-full flex-col items-center bg-slate-100 shadow-md'}
          >
            {filteredOptions.map((option) => (
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
