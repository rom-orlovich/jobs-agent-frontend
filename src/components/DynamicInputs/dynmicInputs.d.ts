import { GenericRecord } from '@/lib/type';
import { MouseEventHandler } from 'react';
import { InputProps } from '../HTMLProps';

export type DynamicInputRenderProps = GenericRecord<unknown> & InputProps;

export type RenderElement<T> = T & {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  setValue?: (value: string) => void;
};

export interface DynamicInputsProps<T extends DynamicInputRenderProps> {
  Render: (props: RenderElement<T>) => JSX.Element;
  firstElement: RenderElement<T>;
  children?: (values: (string | number | readonly string[] | undefined)[]) => JSX.Element;
}
