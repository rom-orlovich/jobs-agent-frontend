import { DivProps, LabelProps } from '@/components/HTML.types';

export interface Option<V> {
  id: string;
  title: string;
  value: V;
}
export interface SelectInputProps<V> {
  labelProps: LabelProps;
  options: Option<V>[];
  optionsElProps?: DivProps;
  setValue?: (value: V | V[]) => void;
  defaultValue?: Option<V> | Option<V>[];
  multiple?: boolean;
}
