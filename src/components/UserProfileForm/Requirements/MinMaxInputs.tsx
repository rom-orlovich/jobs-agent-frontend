import React, { ChangeEventHandler, useEffect, useState } from 'react';
// Import Autocomplete from '../Inputs/Autocomplete/Autocomplete';
// Import { AutocompleteProps } from '../Inputs/Autocomplete/autocomplete';
import InputLabel from '../../Inputs/InputLabel/InputLabel';
import { InputLabelProps } from '../../Inputs/InputLabel/inputLabel.types';
// Import { Option } from '../Inputs/SelectInput/selectInput';
export interface MinMaxInputsOption {
  min: number;
  max: number;
  field: string;
}
export interface MinMaxInputsProps {
  inputTitle?: InputLabelProps;
  initialValues: MinMaxInputsOption;
  setValue?: (value: MinMaxInputsOption) => void;
}

/**
 *Input that contains field and inputs that present min max range of that field name.
 */
function MinMaxInputs({ setValue, inputTitle, initialValues }: MinMaxInputsProps) {
  const minMaxInputsStyle = {
    container: 'flex flex-row gap-2 w-[90%] px-1',
    field: '[&_.input-custom]:py-[0.2rem] flex-[1]',
    labelRangeNum: 'flex-[0.5] min-w-[3rem]'
  };
  const [state, setState] = useState<MinMaxInputsOption>({
    min: Number(initialValues.min || 0),
    max: Number(initialValues.max || 1),
    field: String(initialValues.field || '')
  });

  // Set curState on the external setValue setter only when the field value and max value are not empty.
  useEffect(() => {
    if (!state.field) return;
    if (!state.max) return;
    setValue && setValue(state);
  }, [state]);

  //
  const setFieldValue: ChangeEventHandler<HTMLInputElement> = (e) => {
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
    <div className={minMaxInputsStyle.container}>
      <InputLabel
        {...inputTitle}
        inputProps={{
          onChange: setFieldValue,
          value: state.field,
          inputContainer: {
            className: minMaxInputsStyle.field
          }
        }}
      >
        {inputTitle?.labelProps?.title}
      </InputLabel>
      <InputLabel
        labelProps={{
          className: minMaxInputsStyle.labelRangeNum
        }}
        inputProps={{
          type: 'number',
          value: state.min,
          min: 0,
          max: state.max,
          onChange: setMin,
          inputContainer: {
            className: minMaxInputsStyle.field
          }
        }}
      >
        מינ
      </InputLabel>
      <InputLabel
        labelProps={{
          className: minMaxInputsStyle['labelRangeNum']
        }}
        inputProps={{
          type: 'number',
          min: state.min,
          value: state.max,
          onChange: setMax,
          inputContainer: {
            className: minMaxInputsStyle.field
          }
        }}
      >
        מקס
      </InputLabel>
    </div>
  );
}

export default MinMaxInputs;
