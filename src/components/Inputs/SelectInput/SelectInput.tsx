import { useEffect, useState } from 'react';
import { Listbox } from '@headlessui/react';
import { AiOutlineCheck } from 'react-icons/ai';

import { Option as OptionV, SelectInputProps } from './selectInput.types';
import { classNameGenerator } from '@/lib/utils';

export const isActiveStyle = (active: boolean) => {
  return `${active ? 'bg-confirm-primary bg-text-secondary' : 'bg-text-secondary bg-text-primary'}`;
};

const selectOptionsStyle = {
  isActiveStyle,
  label: 'font-semibold',
  button: 'input-custom px-2 shadow-sm min-w-[8rem]',
  options:
    'absolute z-20 mt-1 max-h-60 w-full max-w-xs overflow-auto rounded-md bg-text-secondary py-1 text-base shadow-md  ring-1 sm:text-sm',
  option: 'flex flex-row items-center justify-between'
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
  //Check if the defaultValue is array or single value.
  //If defaultValue is array and has a values so use the defaultValue as is.
  //Otherwise use the the first option as array of array.
  //Else, if defaultValue is not array use the first option as is.

  const curDefaultValue = Array.isArray(defaultValue)
    ? defaultValue?.length
      ? defaultValue.length === 1
        ? defaultValue[0]
        : defaultValue
      : [options[0]]
    : options[0];

  //Extract the value from the input as single value or array of values depends on the type of the option.
  const getCurValue = (value: OptionV<V> | OptionV<V>[]) =>
    Array.isArray(value) ? value.map((el) => el.value) : value.value;

  // Set the cur default value during the mounting stage of the component.
  useEffect(() => {
    const defaultValue = getCurValue(curDefaultValue);

    setValue && setValue(defaultValue);
  }, []);

  const [selectOption, setOption] = useState<OptionV<V> | OptionV<V>[]>(curDefaultValue);

  console.log('defaultValue', defaultValue);
  console.log('selectOption', selectOption);
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
                          selectOptionsStyle['isActiveStyle'](active),
                          selectOptionsStyle.option,
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
