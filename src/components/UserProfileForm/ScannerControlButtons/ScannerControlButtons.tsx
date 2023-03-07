import React from 'react';

import { ProfileFormComponentsProps } from '@/hooks/useProfileForm/useProfileForm';

import { MdSave } from 'react-icons/md';
import SearchButton from '@/components/Buttons/SearchButton';
import Spinner from '@/components/Spinner/Spinner';
import SuccessButton from '@/components/Buttons/SuccessButton';
import { useScannerContext } from '@/context/ScannerContext';
const buttonsStyle = {
  buttonsContainer: 'mt-3 flex justify-between gap-2',
  load: '',
  download:
    'button-custom bg-success-secondary flex items-center justify-between gap-2 disabled:bg-success-primary-600 bg-success-secondary-500 text-xl text-white hover:bg-success-secondary-400'
};
function ScannerControlButtons({ formState }: ProfileFormComponentsProps<unknown>) {
  const { handleLoadButton, scanner } = useScannerContext();

  const disableButtons = formState.isLoading || scanner.isMutating;

  return (
    <div className={buttonsStyle.buttonsContainer}>
      <SuccessButton disabled={disableButtons} type="submit">
        שמור חיפוש <MdSave />
      </SuccessButton>

      <SearchButton disabled={disableButtons} className={buttonsStyle.load} onClick={handleLoadButton()}>
        חפש משרות
      </SearchButton>

      <Spinner isLoading={scanner.isMutating} />
    </div>
  );
}

export default ScannerControlButtons;
