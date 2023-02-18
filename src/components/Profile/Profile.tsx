/* eslint-disable capitalized-comments */
import React from 'react';
import InputLabel from '../Inputs/InputLabel/InputLabel';
import { FormComponents } from '../UserForm/userForm';
import ExcludedRequirements from './ExcludedRequirements';
// import { FaEdit } from 'react-icons/fa';

import Requirements from './Requirements';

function Profile(userFormState: FormComponents<unknown>) {
  const inputLabelStyle = {
    label: 'flex flex-col max-w-[theme(spacing.40)] text-right',
    input: '',
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
          id: 'overall-experience',
          className: inputLabelStyle.input,
          type: 'text',
          onChange: userFormState.setOverallExperience
        }}
      >
        שנות ניסיון
      </InputLabel>

      <Requirements {...userFormState} />
      <ExcludedRequirements {...userFormState} />
    </div>
  );
}
export default Profile;
// const textFieldProps = {
//   labelProps: {
//     className: inputLabelStyle.labelTextArea
//   },
//   textAreaProps: {
//     className: inputLabelStyle.input
//   },
//   IconButtonProps: {
//     Icon: <FaEdit className={inputLabelStyle.icon} />,
//     buttonProps: {
//       className: inputLabelStyle.button
//     }
//   }
// };

{
  /* <InputLabel {...textFieldProps}>היכולות שלי</InputLabel>

      <InputLabel {...textFieldProps}>אני לא מחפש:</InputLabel> */
}
