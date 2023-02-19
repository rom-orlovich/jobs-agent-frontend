import { DivProps, LabelProps } from '@/components/HTMLProps';

export interface Option<V> {
  id: string;
  title: string;
  value: V;
}
export interface SelectInputProps<V> {
  labelProps: LabelProps;
  options: Option<V>[];
  optionsElProps?: DivProps;
  setValue?: (value: string) => void;
  defaultValue?: V;
}
