import { useEffect, useState } from 'react';
import { Listbox } from '@headlessui/react';
import { AiOutlineCheck } from 'react-icons/ai';

import { Option as OptionV, SelectInputProps } from './selectInput.types';
import { classNameGenerator } from '@/lib/utils';

//
const selectOptionsStyle = {
  active: (active: boolean) => {
    return `${active ? 'bg-blue-500 text-white' : 'bg-white text-black'}`;
  },
  label: 'font-semibold',
  button: 'input-custom px-2 shadow-sm',
  options:
    'absolute z-20 mt-1 max-h-60 w-full max-w-xs overflow-auto rounded-md bg-white py-1 text-base shadow-md  ring-1 sm:text-sm'
};

export default function SelectInput<V extends string>({
  options,
  optionsElProps,
  labelProps,
  setValue,
  defaultValue,
  multiple,
  selectInputWrapper
}: SelectInputProps<V>) {
  const curDefaultValue = Array.isArray(defaultValue)
    ? defaultValue.length
      ? defaultValue
      : [options[0]]
    : options[0];

  //Extract the value from the input as single value or array of values depends on the type of the option.
  const getCurValue = (value: OptionV<V> | OptionV<V>[]) =>
    Array.isArray(value) ? value.map((el) => el.value) : value.value;

  // Set the cur default value during the mounting stage of the component.
  useEffect(() => {
    setValue && setValue(getCurValue(curDefaultValue));
  }, []);

  const [selectOption, setOption] = useState<OptionV<V> | OptionV<V>[]>(curDefaultValue);
  return (
    <Listbox
      multiple={multiple ? true : false}
      value={selectOption}
      onChange={(value) => {
        setValue && setValue(getCurValue(value));
        setOption(value);
      }}
    >
      <div
        {...selectInputWrapper}
        className={classNameGenerator('flex flex-col', selectInputWrapper?.className)}
      >
        <Listbox.Label
          {...labelProps}
          className={classNameGenerator(selectOptionsStyle.label, labelProps.className)}
        >
          {labelProps.title}
        </Listbox.Label>
        <div className="relative">
          <Listbox.Button className={selectOptionsStyle.button}>
            {Array.isArray(selectOption)
              ? selectOption.map((el) => el.title).join(', ')
              : selectOption.title}
          </Listbox.Button>
          <Listbox.Options className={selectOptionsStyle.options}>
            {options.map((option) => {
              return (
                <Listbox.Option key={option.id} value={option}>
                  {({ active, selected }) => {
                    return (
                      <div
                        className={classNameGenerator(
                          selectOptionsStyle['active'](active),
                          'flex flex-row items-center justify-between',
                          optionsElProps?.className
                        )}
                      >
                        {option.title}
                        {selected && <AiOutlineCheck />}
                      </div>
                    );
                  }}
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </div>
      </div>
    </Listbox>
  );
}
