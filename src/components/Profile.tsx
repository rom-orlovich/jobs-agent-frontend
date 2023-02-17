import React from 'react'
import InputLabel from './Inputs/InputLabel/InputLabel'
function Profile() {
  const inputLabelStyle = {
    label: 'flex flex-col max-w-[theme(spacing.40)]',
    input:
      'border border-gray-300 rounded-lg focus:border focus:border-blue-300 focus:outline-blue-100',
    labelTextArea: 'flex flex-col max-w-[theme(spacing.80)]',
  }

  return (
    <div className="bg-white">
      <InputLabel
        labelProps={{ className: inputLabelStyle.label }}
        inputProps={{
          className: inputLabelStyle.input,
          type: 'text',
        }}
      >
        שנות ניסיון
      </InputLabel>

      <InputLabel
        labelProps={{ className: inputLabelStyle.labelTextArea }}
        textAreaProps={{ className: inputLabelStyle.input }}
      >
        היכולות שלי
      </InputLabel>

      <InputLabel
        labelProps={{ className: inputLabelStyle.labelTextArea }}
        textAreaProps={{ className: inputLabelStyle.input }}
      >
        אני לא מחפש:
      </InputLabel>
    </div>
  )
}
export default Profile
