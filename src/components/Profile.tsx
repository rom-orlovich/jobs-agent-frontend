import React from 'react';
import InputLabel from './Inputs/InputLabel/InputLabel';
import { FaEdit } from 'react-icons/fa';
function Profile() {
  const inputLabelStyle = {
    label: 'flex flex-col max-w-[theme(spacing.40)] text-right',
    input:
      'border border-gray-300 rounded-lg focus:border focus:border-blue-300 focus:outline-blue-100',
    labelTextArea: 'flex flex-col max-w-[theme(spacing.80)] text-right',
    icon: 'text-green-400',
    button: 'absolute right-0 top-0'
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

      <InputLabel
        labelProps={{
          className: inputLabelStyle.labelTextArea
        }}
        textAreaProps={{
          className: inputLabelStyle.input
        }}
        IconButtonProps={{
          Icon: <FaEdit className={inputLabelStyle.icon} />,
          buttonProps: {
            className: inputLabelStyle.button
          }
        }}
      >
        היכולות שלי
      </InputLabel>

      <InputLabel
        labelProps={{
          className: inputLabelStyle.labelTextArea
        }}
        textAreaProps={{
          className: inputLabelStyle.input
        }}
      >
        אני לא מחפש:
      </InputLabel>
    </div>
  );
}
export default Profile;
