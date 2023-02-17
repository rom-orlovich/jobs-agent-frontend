import { DivProps, LabelProps } from '@/components/HTMLProps';

export interface Option<V> {
  id: string;
  title: string;
  value: V;
}
export interface SelectInputProps {
  labelProps: LabelProps;
  options: Option[];
  optionsElProps?: DivProps;
}
