import React, { ChangeEventHandler, useEffect, useState } from 'react';
import Autocomplete from '../Inputs/Autocomplete/Autocomplete';
import InputLabel from '../Inputs/InputLabel/InputLabel';
import { Option } from '../Inputs/SelectInput/selectInput';
export interface MinMaxSelectOption {
  min: number;
  max: number;
  title: string;
}
export interface MinMaxSelectProps {
  options: string[];
  setValue: (value: MinMaxSelectOption) => void;
}

function MinMaxSelect({ options, setValue }: MinMaxSelectProps) {
  const autocompleteOptions: Option<string>[] = options.map((el, i) => ({
    id: el + i,
    title: el,
    value: el
  }));
  const [state, setState] = useState({
    min: 0,
    max: 1,
    title: ''
  });

  useEffect(() => {
    if (!state.max) return;
    if (!state.title) return;
    setValue(state);
  }, [state.max, state.title]);

  const setTitle = (value: string) => {
    setState((pre) => {
      return {
        ...pre,
        title: value
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
      <Autocomplete options={autocompleteOptions} setValue={setTitle} />
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
