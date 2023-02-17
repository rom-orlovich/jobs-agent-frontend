import React from 'react'
import InputLabel from './Inputs/InputLabel'
function Profile() {
  const inputLabelStyle = {
    label: 'flex flex-col max-w-[theme(spacing.40)]',
    input:
      'border border-gray-300 rounded-lg focus:border focus:border-blue-300 focus:outline-blue-100',
  }

  return (
    <div className="bg-white">
      <InputLabel
        labelProps={{ className: inputLabelStyle.label }}
        inputProps={{ className: inputLabelStyle.input, type: 'text' }}
      >
        Overall Experience (Years)
      </InputLabel>
    </div>
  )
}
export default Profile
