import { Option } from '../SelectInput/selectInput.types';
export interface AutocompleteProps<V> {
  setValue?: (value: V) => void;
  options: Option<V>[];
  multiple?: boolean;
  label?: string;
  defaultValue?: Option<V>;
}
