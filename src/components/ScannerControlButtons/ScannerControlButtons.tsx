import React from 'react';

import Spinner from '../Spinner/Spinner';
import ConfirmButton from '../Buttons/ConfirmButton';
import { useAuthContext } from '@/context/AuthContext';

import useScannerController from '@/hooks/useScannerController';
import { FormComponents } from '@/hooks/useUserProfileForm/useUserProfileForm';
import SearchButton from '../Buttons/SearchButton';
import { MdSave } from 'react-icons/md';
const buttonsStyle = {
  buttonsContainer: 'mt-3 flex justify-between gap-2',
  load: '',
  download:
    'button-custom bg-success-secondary flex items-center justify-between gap-2 disabled:bg-success-primary-600 bg-success-secondary-500 text-xl text-white hover:bg-success-secondary-400'
};
function ScannerControlButtons({ formState }: FormComponents<unknown>) {
  const authContext = useAuthContext();
  const { handleLoadButton, scanner } = useScannerController(authContext);
  const disableButtons = formState.isLoading || scanner.isMutating;
  return (
    <div className={buttonsStyle.buttonsContainer}>
      <ConfirmButton disabled={disableButtons} type="submit">
        שמור חיפוש <MdSave />
      </ConfirmButton>

      <SearchButton
        disabled={disableButtons}
        className={buttonsStyle.load}
        onClick={handleLoadButton(authContext.userProfileData.activeHash)}
      >
        חפש משרות
      </SearchButton>

      <Spinner isLoading={scanner.isMutating} />
    </div>
  );
}

export default ScannerControlButtons;
