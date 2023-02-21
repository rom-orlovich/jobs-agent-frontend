import {
  ButtonProps,
  InputProps,
  LabelProps,
  LabelTextProps,
  TextAreaProps
} from '@/components/Inputs/HTML.types';
import { ReactNode } from 'react';
export interface InputLabelProps {
  inputProps?: InputProps;
  labelProps?: LabelProps & { textProps?: LabelTextProps };
  textAreaProps?: TextAreaProps;
  IconButtonProps?: { Icon: ReactNode; buttonProps: ButtonProps };
}
