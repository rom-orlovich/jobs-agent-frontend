import React, { ChangeEventHandler, useEffect, useState } from 'react';
// Import Autocomplete from '../Inputs/Autocomplete/Autocomplete';
// Import { AutocompleteProps } from '../Inputs/Autocomplete/autocomplete';
import InputLabel from '../Inputs/InputLabel/InputLabel';
import { InputLabelProps } from '../Inputs/InputLabel/inputLabel';
// Import { Option } from '../Inputs/SelectInput/selectInput';
export interface MinMaxSelectOption {
  min: number;
  max: number;
  title: string;
}
export interface MinMaxSelectProps {
  // Options: string[];
  inputLabelProps: InputLabelProps;
  // AutocompleteProps?: AutocompleteProps<string>;

  setValue?: (value: MinMaxSelectOption) => void;
}

function MinMaxSelect({ setValue, inputLabelProps }: MinMaxSelectProps) {
  // Const autocompleteOptions: Option<string>[] = options.map((el, i) => ({
  //   Id: el + i,
  //   Title: el,
  //   Value: el
  // }));
  const [state, setState] = useState<MinMaxSelectOption>({
    min: 0,
    max: 1,
    title: ''
  });

  useEffect(() => {
    if (!state.title) return;
    if (!state.max) return;
    setValue && setValue(state);
  }, [state]);

  // Const setTitle = (value: string) => {
  //   SetState((pre) => {
  //     Return {
  //       ...pre,
  //       Title: value
  //     };
  //   });
  // };
  const setTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setState((pre) => {
      return {
        ...pre,
        title: e.target.value
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
      {/* <Autocomplete options={autocompleteOptions} setValue={setTitle} /> */}
      <InputLabel
        {...inputLabelProps}
        inputProps={{
          onChange: setTitle
        }}
      >
        {inputLabelProps.labelProps?.title}{' '}
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

export default MinMaxSelect;
