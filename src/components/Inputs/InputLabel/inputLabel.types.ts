import {
  ButtonProps,
  InputProps,
  LabelProps,
  LabelTextProps,
  SpanProps,
  TextAreaProps
} from '@/components/HTML.types';
import { ReactNode } from 'react';
export interface InputLabelProps {
  inputProps?: InputProps & { inputContainer?: { className: string } };
  labelProps?: LabelProps;
  textProps?: LabelTextProps;
  textAreaProps?: TextAreaProps;
  IconButtonProps?: { Icon: ReactNode; buttonProps: ButtonProps };
  wrapperInputLabel?: SpanProps;
}
