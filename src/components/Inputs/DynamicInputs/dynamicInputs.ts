import { GenericRecord } from '@/lib/type';
import { InputProps } from '../../HTMLProps';

export type DynamicInputRenderProps = GenericRecord<unknown> & InputProps;

export type RenderElement<T, V> = T & {
  setValue?: (value: V) => void;
};

export interface DynamicInputsProps<T extends DynamicInputRenderProps, V> {
  firstElement: RenderElement<T, V>;
  Render: (props: RenderElement<T, V>) => JSX.Element;
  children?: (values: RenderElement<T, V>[]) => JSX.Element;
}
