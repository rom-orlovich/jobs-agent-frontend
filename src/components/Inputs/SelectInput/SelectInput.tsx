import { useEffect, useState } from 'react';
import { Listbox } from '@headlessui/react';
import { AiOutlineCheck } from 'react-icons/ai';

import { Option as OptionV, SelectInputProps } from './selectInput.types';
import { classNameGenerator } from '@/lib/utils';

export const isActiveStyle = (active: boolean) => {
  return `${
    active ? ' bg-success-primary-400 text-white cursor-pointer' : 'bg-white text-black'
  } rounded-md p-2 text-base`;
};

const selectOptionsStyle = {
  isActiveStyle,
  label: 'font-semibold cursor-pointer ',
  button: 'input-custom px-2 shadow-sm min-w-[8rem]',
  options:
    'absolute z-50 mt-1 max-h-75 w-full max-w-xs overflow-auto bg-text-secondary py-1 text-base   ring-1 sm:text-sm card',
  option: 'flex flex-row items-center justify-between'
};

export default function SelectInput<V>({
  options,
  optionsElProps,
  labelProps,
  setValue,
  defaultValue,
  multiple,
  selectInputWrapper,
  buttonProps
}: SelectInputProps<V>) {
  let curDefaultValue: OptionV<V> | OptionV<V>[];

  //Check if the defaultValue is array and it has values and if it has values use them as defaultValue.
  //Else, use the first value of options array as array of array.
  if (Array.isArray(defaultValue))
    if (defaultValue?.length) curDefaultValue = defaultValue;
    else curDefaultValue = [options[0]];
  //Else check if the default value exist and if it does use the defaultValue.
  //Else use the first options array value.
  else if (defaultValue) curDefaultValue = defaultValue;
  else curDefaultValue = options[0];

  //Extract the value from the input as single value or array of values depends on the type of the option.
  const getCurValue = (value: OptionV<V> | OptionV<V>[]) =>
    Array.isArray(value) ? value.map((el) => el.value) : value.value;

  // Set the cur default value during the mounting stage of the component.
  useEffect(() => {
    const defaultValue = getCurValue(curDefaultValue);

    setValue && setValue(defaultValue);
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
          <Listbox.Button
            className={classNameGenerator(selectOptionsStyle.button, buttonProps?.className)}
          >
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
