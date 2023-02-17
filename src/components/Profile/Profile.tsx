import React from 'react';
import InputLabel from '../Inputs/InputLabel/InputLabel';
import { FaEdit } from 'react-icons/fa';
function Profile() {
  const inputLabelStyle = {
    label: 'flex flex-col max-w-[theme(spacing.40)] text-right',
    input: '',
    labelTextArea: 'flex flex-col max-w-[theme(spacing.80)] text-right',
    icon: 'text-green-400',
    button: 'absolute right-0 top-0'
  };

  const textFieldProps = {
    labelProps: {
      className: inputLabelStyle.labelTextArea
    },
    textAreaProps: {
      className: inputLabelStyle.input
    },
    IconButtonProps: {
      Icon: <FaEdit className={inputLabelStyle.icon} />,
      buttonProps: {
        className: inputLabelStyle.button
      }
    }
  };

  return (
    <div>
      <InputLabel
        labelProps={{
          className: inputLabelStyle.label
        }}
        inputProps={{
          className: inputLabelStyle.input,
          type: 'text'
        }}
      >
        שנות ניסיון
      </InputLabel>

      <InputLabel {...textFieldProps}>היכולות שלי</InputLabel>

      <InputLabel {...textFieldProps}>אני לא מחפש:</InputLabel>
    </div>
  );
}
export default Profile;
