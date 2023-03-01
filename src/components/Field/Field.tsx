import React from 'react';

interface FieldProps {
  title: string;
  value: string;
  titleStyle?: string;
  valueStyle?: string;
  containerStyle?: string;
  dir?: 'rtl' | 'ltr';
}

function Field({ title, value, titleStyle, containerStyle, valueStyle, dir }: FieldProps) {
  return (
    <span dir={dir} className={containerStyle}>
      <span className={titleStyle}> {title} </span>
      <span className={valueStyle}> {value} </span>
    </span>
  );
}

export default Field;
