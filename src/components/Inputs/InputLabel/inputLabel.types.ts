import {
  ButtonProps,
  InputProps,
  LabelProps,
  LabelTextProps,
  SpanProps,
  TextAreaProps
} from '@/components/HTML.types';
import { ReactNode } from 'react';
export interface IconButtonProps {
  Icon: ReactNode;
  buttonProps: ButtonProps;
}
export interface InputLabelProps {
  inputProps?: InputProps & { inputContainer?: { className: string } };
  labelProps?: LabelProps;
  textProps?: LabelTextProps;
  textAreaProps?: TextAreaProps;
  IconButtonProps?: IconButtonProps;
  wrapperInputLabel?: SpanProps;
}
