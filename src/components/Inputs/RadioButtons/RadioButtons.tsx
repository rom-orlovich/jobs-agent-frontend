import { classNameGenerator } from '@/lib/utils';
import React from 'react';
import { inputLabelStyle } from '../InputLabel/InputLabel';
import { InputLabelProps } from '../InputLabel/inputLabel.types';

function RadioButtons({
  labelProps,
  inputProps,
  curState,
  options
}: InputLabelProps & { options: string[]; curState: string }) {
  return (
    <div className="flex gap-2 px-3">
      {options.map((option) => {
        return (
          <label
            key={option}
            {...labelProps}
            className={classNameGenerator(inputLabelStyle.label, labelProps?.className)}
          >
            {option}
            <input
              {...inputProps}
              id={option}
              value={option}
              defaultChecked={option === curState}
              type="radio"
            />
          </label>
        );
      })}
    </div>
  );
}

export default RadioButtons;
