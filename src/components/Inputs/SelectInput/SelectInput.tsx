import { useEffect, useState } from 'react';
import { Listbox } from '@headlessui/react';

import { SelectInputProps } from './selectInput';
import { classNameGenerator } from '@/lib/utils';
export default function SelectInput<V extends string>({
  options,
  optionsElProps,
  labelProps,
  setValue
}: SelectInputProps<V>) {
  const [selectOption, setOption] = useState(options[0]);

  const optionsStyle = {
    active: (active: boolean) => {
      return `${active ? 'bg-blue-500 text-white' : 'bg-white text-black'}`;
    },
    label: 'font-medium'
  };

  useEffect(() => {
    setValue && setValue(options[0].value);
  }, []);
  return (
    <Listbox
      value={selectOption}
      onChange={(value) => {
        setValue && setValue(value.value);
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
          <Listbox.Button>{selectOption.title}</Listbox.Button>
          <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full max-w-xs overflow-auto rounded-md bg-white py-1 text-base shadow-md  ring-1 sm:text-sm">
            {options.map((option) => (
              <Listbox.Option key={option.id} value={option}>
                {({ active }) => {
                  return (
                    <div
                      className={classNameGenerator(
                        optionsStyle['active'](active),
                        optionsElProps?.className
                      )}
                    >
                      {/* {selected && <BsCheckLg />} */}
                      {option.title}
                    </div>
                  );
                }}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </div>
    </Listbox>
  );
}
