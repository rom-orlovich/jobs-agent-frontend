import { GenericRecord } from '@/lib/types/types';
import { classNameGenerator } from '@/lib/utils';
import React, { PropsWithChildren } from 'react';
import { InputLabelProps } from './inputLabel.types';

/**
 * Simple input label component that can get also render as textarea input instead the regular input element.
 */
function InputLabel({
  inputProps,
  labelProps,
  children,
  textProps,
  textAreaProps,
  IconButtonProps
}: InputLabelProps & PropsWithChildren) {
  let inputContainer: GenericRecord<string> | undefined = {};
  if (inputProps) {
    ({ inputContainer, ...inputProps } = inputProps);
  }
  const inputLabelStyle = {
    label: 'font-medium',
    inputContainer: 'w-full h-full relative',
    input: `px-[0.5rem] py-[0.3rem] text-[0.8rem] w-full rounded-lg input-custom`,
    textArea: `px-4 py-2 w-full h-full rounded-lg input-custom`
  };

  const Input = textAreaProps ? (
    <textarea
      autoComplete="off"
      {...textAreaProps}
      className={classNameGenerator(inputLabelStyle.textArea, textAreaProps?.className)}
    />
  ) : (
    <input
      autoComplete="off"
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
        <span className={inputLabelStyle.inputContainer} {...inputContainer}>
          {Input}
          {IconButton}
        </span>
      </label>
    </>
  );
}
export default InputLabel;
