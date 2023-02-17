import React, { PropsWithChildren } from 'react'
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

interface InputLabelProps {
  inputProps?: InputProps
  labelProps?: LabelProps & { textProps?: LabelTextProps }
}

function InputLabel({
  inputProps,
  labelProps,
  children,
}: InputLabelProps & PropsWithChildren) {
  const textProps = labelProps?.textProps ? labelProps?.textProps : {}
  return (
    <>
      <label {...labelProps}>
        <span {...textProps}>{children} </span>
        <input
          {...inputProps}
          className={`px-4 py-2 ${inputProps?.className}`}
        />
      </label>
    </>
  )
}
export default InputLabel
