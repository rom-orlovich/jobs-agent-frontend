import { GenericRecord } from '@/lib/type';

import { InputProps } from '../HTMLProps';

export type DynamicInputRenderProps = GenericRecord<unknown> & InputProps;

export type RenderElement<T, V> = T & {
  setValue?: (value: V) => void;
};

export interface DynamicInputsProps<T extends DynamicInputRenderProps> {
  Render: (props: RenderElement<T, V>) => JSX.Element;
  firstElement: RenderElement<T, V>;
  children?: (values: (string | number | readonly string[] | undefined)[]) => JSX.Element;
}
