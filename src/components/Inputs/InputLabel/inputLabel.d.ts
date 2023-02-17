import { ButtonProps } from '@/components/Buttons/button'
import { IconType } from 'react-icons'

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>
type LabelProps = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>
type LabelTextProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>
type TextAreaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

interface InputLabelProps {
  inputProps?: InputProps
  labelProps?: LabelProps & { textProps?: LabelTextProps }
  textAreaProps?: TextAreaProps
  IconButtonProps?: { Icon: IconType; buttonProps: ButtonProps }
}
