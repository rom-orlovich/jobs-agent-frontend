import { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { AutocompleteProps } from './autocomplete.types';
import { classNameGenerator } from '@/lib/utils';
export default function Autocomplete<V>({
  setValue,
  options,
  multiple,
  label,
  defaultValue,
  inputLabelProps
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
      <div className={inputLabelProps?.wrapperInputLabel?.className}>
        {label ? (
          <Combobox.Label className={'font-medium'} {...inputLabelProps?.labelProps}>
            {label}
          </Combobox.Label>
        ) : (
          <></>
        )}
        <Combobox.Input<'input', { value: V; title: string }[]>
          {...inputLabelProps?.inputProps}
          displayValue={
            multiple
              ? (values) => {
                  return values.map((el) => el.title).join(', ');
                }
              : undefined
          }
          autoComplete={'off'}
          value={defaultValue?.value as string}
          className={classNameGenerator('input-custom', inputLabelProps?.inputProps?.className)}
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
        <div />
      </div>
    </Combobox>
  );
}
