import { classNameGenerator } from '@/lib/utils';
import React, { PropsWithChildren } from 'react';
import { InputLabelProps } from './inputLabel';

function InputLabel({
  inputProps,
  labelProps,
  children,
  textAreaProps,
  IconButtonProps
}: InputLabelProps & PropsWithChildren) {
  const textProps = labelProps?.textProps ? labelProps?.textProps : {};

  const inputLabelStyle = {
    label: 'font-medium',
    inputContainer: 'w-full h-full relative',
    input: `px-4 py-2 w-full h-full rounded-lg input-custom`,
    textArea: `px-4 py-2 w-full h-full rounded-lg input-custom`
  };

  const Input = textAreaProps ? (
    <textarea
      {...textAreaProps}
      className={classNameGenerator(inputLabelStyle.textArea, textAreaProps?.className)}
    />
  ) : (
    <input
      {...inputProps}
      className={classNameGenerator(inputLabelStyle.input, inputProps?.className)}
    />
  );

  const IconButton = IconButtonProps ? (
    <button {...IconButtonProps.buttonProps}>{IconButtonProps.Icon}</button>
  ) : (
    <></>
  );

  return (
    <>
      <label
        {...labelProps}
        className={classNameGenerator(inputLabelStyle.label, labelProps?.className)}
      >
        <span {...textProps}>{children} </span>
        <span className={inputLabelStyle.inputContainer}>
          {Input}
          {IconButton}
        </span>
      </label>
    </>
  );
}
export default InputLabel;
