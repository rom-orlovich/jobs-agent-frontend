import { classNameGenerator } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'
import { InputLabelProps } from './inputLabel'
// Import {FiEdit} from "react-icons/fi"
// Type InputProps = React.DetailedHTMLProps<
//   React.InputHTMLAttributes<HTMLInputElement>,
//   HTMLInputElement
// >
// Type LabelProps = React.DetailedHTMLProps<
//   React.LabelHTMLAttributes<HTMLLabelElement>,
//   HTMLLabelElement
// >
// Type LabelTextProps = React.DetailedHTMLProps<
//   React.HTMLAttributes<HTMLSpanElement>,
//   HTMLSpanElement
// >
// Type TextAreaProps=React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

// Interface InputLabelProps {
//   InputProps?: InputProps
//   LabelProps?: LabelProps & { textProps?: LabelTextProps }
//   TextAreaProps?:TextAreaProps
// }

function InputLabel({
  inputProps,
  labelProps,
  children,
  textAreaProps,
  IconButtonProps,
}: InputLabelProps & PropsWithChildren) {
  const textProps = labelProps?.textProps ? labelProps?.textProps : {}

  const inputLabelStyle = {
    input: 'px-4 py-2',
    textArea: 'px-4 py-2',
  }

  const Input = textAreaProps ? (
    <textarea
      {...textAreaProps}
      className={classNameGenerator(
        inputLabelStyle.textArea,
        textAreaProps?.className
      )}
    />
  ) : (
    <input
      {...inputProps}
      className={classNameGenerator(
        inputLabelStyle.input,
        inputProps?.className
      )}
    />
  )

  const IconButton = IconButtonProps ? (
    <button>
      <IconButtonProps.Icon />
    </button>
  ) : (
    <></>
  )

  return (
    <>
      <label {...labelProps}>
        <span {...textProps}>{children} </span>
        {Input}
        {IconButton}
      </label>
    </>
  )
}
export default InputLabel
