import { Option } from '../SelectInput/selectInput';
export interface AutocompleteProps<V> {
  setValue?: (value: V) => void;
  options: Option<V>[];
  multiple?: boolean;
}
