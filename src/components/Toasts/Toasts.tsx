import React from 'react';
import { ToastContainer } from 'react-toastify';
const contextClass = {
  success: 'bg-success-primary',
  error: 'bg-error-400',
  info: 'bg-info',
  warning: 'bg-warning',
  default: 'bg-success-primary-500',
  dark: ''
};
function Toasts() {
  return (
    <ToastContainer
      position="bottom-left"
      autoClose={1500}
      toastClassName={(props) =>
        contextClass[props?.type || 'default'] +
        ' relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'
      }
      bodyClassName={() => 'text-sm font-white font-med block p-3'}
    />
  );
}

export default Toasts;
