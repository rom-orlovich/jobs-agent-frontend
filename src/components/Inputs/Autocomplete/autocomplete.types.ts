import { InputLabelProps } from '../InputLabel/inputLabel.types';

export interface AutocompleteProps<V extends string> {
  setValue?: (value: V) => void;
  options: V[];
  multiple?: boolean;
  label?: string;
  inputLabelProps?: InputLabelProps;
  defaultValue?: V;
}
