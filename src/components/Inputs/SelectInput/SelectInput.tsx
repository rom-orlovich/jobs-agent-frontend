import { useEffect, useState } from 'react';
import { Listbox } from '@headlessui/react';
import { AiOutlineCheck } from 'react-icons/ai';

import { Option as OptionV, SelectInputProps } from './selectInput';
import { classNameGenerator } from '@/lib/utils';
export default function SelectInput<V extends string>({
  options,
  optionsElProps,
  labelProps,
  setValue,
  defaultValue,
  multiple
}: SelectInputProps<V>) {
  const curDefaultValue = Array.isArray(defaultValue)
    ? defaultValue.length
      ? defaultValue
      : [options[0]]
    : options[0];
  console.log(curDefaultValue);
  const [selectOption, setOption] = useState<OptionV<V> | OptionV<V>[]>(curDefaultValue);

  const optionsStyle = {
    active: (active: boolean) => {
      return `${active ? 'bg-blue-500 text-white' : 'bg-white text-black'}`;
    },
    label: 'font-medium'
  };
  const getCurValue = (value: OptionV<V> | OptionV<V>[]) =>
    Array.isArray(value) ? value.map((el) => el.value) : value.value;
  useEffect(() => {
    setValue && setValue(getCurValue(curDefaultValue));
  }, []);

  return (
    <Listbox
      multiple={multiple ? true : false}
      value={selectOption}
      onChange={(value) => {
        // Const curValueArg = getCurValue(value);
        console.log(value);
        setValue && setValue(getCurValue(value));
        setOption(value);
      }}
    >
      <div className="flex flex-col">
        <Listbox.Label
          {...labelProps}
          className={classNameGenerator(optionsStyle.label, labelProps.className)}
        >
          {labelProps.title}
        </Listbox.Label>
        <div className="relative mt-1">
          <Listbox.Button>
            {Array.isArray(selectOption)
              ? selectOption.map((el) => el.title).join(',')
              : selectOption.title}
          </Listbox.Button>
          <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full max-w-xs overflow-auto rounded-md bg-white py-1 text-base shadow-md  ring-1 sm:text-sm">
            {options.map((option) => {
              console.log(option);
              return (
                <Listbox.Option key={option.id} value={option}>
                  {({ active, selected }) => {
                    return (
                      <div
                        className={classNameGenerator(
                          optionsStyle['active'](active),
                          optionsElProps?.className
                        )}
                      >
                        {selected && <AiOutlineCheck />}
                        {option.title}
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
