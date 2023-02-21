import { GenericRecord } from '@/lib/types/types';
import { InputProps } from '../HTML.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DynamicInputRenderProps = GenericRecord<any> & InputProps;

export type RenderElement<T> = T & {
  setValue?: (value: T) => void;
};
export interface DynamicInputsProps<T extends DynamicInputRenderProps> {
  defaultValues: RenderElement<T>[];
  Render: (props: RenderElement<T>) => JSX.Element;
  children?: (values: RenderElement<T>[]) => JSX.Element;
}
