import { DivProps, LabelProps } from '@/components/HTMLProps';

export interface Option {
  id: string;
  title: string;
  value: string;
}
export interface SelectInputProps {
  labelProps: LabelProps;
  options: Option[];
  optionsElProps?: DivProps;
}
