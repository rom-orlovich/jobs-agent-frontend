import { ButtonProps } from '@/components/Buttons/button';
import { InputProps, LabelProps, TextAreaProps } from '@/components/HTMLProps';
import { ReactNode } from 'react';
interface InputLabelProps {
  inputProps?: InputProps;
  labelProps?: LabelProps & { textProps?: LabelTextProps };
  textAreaProps?: TextAreaProps;
  IconButtonProps?: { Icon: ReactNode; buttonProps: ButtonProps };
}
