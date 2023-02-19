import React, { ChangeEventHandler, useEffect, useState } from 'react';
// Import Autocomplete from '../Inputs/Autocomplete/Autocomplete';
// Import { AutocompleteProps } from '../Inputs/Autocomplete/autocomplete';
import InputLabel from '../../Inputs/InputLabel/InputLabel';
import { InputLabelProps } from '../../Inputs/InputLabel/inputLabel';
// Import { Option } from '../Inputs/SelectInput/selectInput';
export interface MinMaxInputsOption {
  min: number;
  max: number;
  field: string;
}
export interface MinMaxInputsProps {
  inputTitle?: InputLabelProps;
  initialValues: MinMaxInputsOption;
  // InputMin?: InputLabelProps;
  // InputMax?: InputLabelProps;

  setValue?: (value: MinMaxInputsOption) => void;
}

function MinMaxInputs({ setValue, inputTitle, initialValues }: MinMaxInputsProps) {
  const [state, setState] = useState<MinMaxInputsOption>({
    min: Number(initialValues.min || 0),
    max: Number(initialValues.max || 1),
    field: String(initialValues.field || '')
  });

  useEffect(() => {
    if (!state.field) return;
    if (!state.max) return;
    setValue && setValue(state);
  }, [state]);
  const setTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setState((pre) => {
      return {
        ...pre,
        field: e.target.value
      };
    });
  };
  const setMin: ChangeEventHandler<HTMLInputElement> = (e) => {
    setState((pre) => {
      return {
        ...pre,
        min: Number(e.target.value)
      };
    });
  };
  const setMax: ChangeEventHandler<HTMLInputElement> = (e) => {
    setState((pre) => {
      return {
        ...pre,
        max: Number(e.target.value)
      };
    });
  };
  return (
    <div>
      <InputLabel
        {...inputTitle}
        inputProps={{
          onChange: setTitle,
          value: state.field
        }}
      >
        {inputTitle?.labelProps?.title}
      </InputLabel>
      <InputLabel
        inputProps={{
          type: 'number',
          value: state.min,
          min: 0,
          max: state.max,
          onChange: setMin
        }}
      >
        מינמום
      </InputLabel>
      <InputLabel
        inputProps={{
          type: 'number',
          min: state.min,
          value: state.max,
          onChange: setMax
        }}
      >
        מקסימום
      </InputLabel>
    </div>
  );
}

export default MinMaxInputs;
