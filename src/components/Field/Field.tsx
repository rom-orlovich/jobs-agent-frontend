import React from 'react';

interface FieldProps {
  title: string;
  value: string;
  titleStyle?: string;
  valueStyle?: string;
  containerStyle?: string;
}

function Field({ title, value, titleStyle, containerStyle, valueStyle }: FieldProps) {
  return (
    <span className={containerStyle}>
      <span className={titleStyle}> {title} </span>
      <span className={valueStyle}> {value} </span>
    </span>
  );
}

export default Field;
