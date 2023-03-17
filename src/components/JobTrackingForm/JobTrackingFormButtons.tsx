import { useRouter } from 'next/router';
import React from 'react';
import SuccessButton from '../Buttons/SuccessButton';

import { jobTrackingFormStyle } from './JobTrackingForm';

function JobTrackingFormButtons() {
  const router = useRouter();
  return (
    <div className={jobTrackingFormStyle.buttonsContainer}>
      <SuccessButton
        onClick={(e) => {
          e.preventDefault();
          router.back();
        }}
      >
        חזור
      </SuccessButton>

      <SuccessButton type="submit">שמור</SuccessButton>
    </div>
  );
}

export default JobTrackingFormButtons;
