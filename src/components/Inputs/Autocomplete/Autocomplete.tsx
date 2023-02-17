import { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { AutocompleteProps } from './autocomplete';
// Import { Option } from '../SelectInput/selectInput';
// Import { Option } from '../SelectInput/selectInput';

export default function Autocomplete<V>({ setValue, options, multiple }: AutocompleteProps<V>) {
  const [selectedOption, setSelectedOption] = useState(multiple ? options : options[0]);
  const [query, setQuery] = useState('');

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
          return option.title.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      value={selectedOption}
      onChange={(value) => {
        if (!multiple && !Array.isArray(value)) setValue && setValue(value.value);
        setSelectedOption(value);
      }}
    >
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
          onChange={(event) => setQuery(event.target.value)}
        />

        <div className="relative ">
          <Combobox.Options
            className={'absolute z-50 flex w-full flex-col items-center bg-slate-100 shadow-md'}
          >
            {filteredOptions.map((option) => (
              <Combobox.Option key={option.id} value={option.value}>
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
