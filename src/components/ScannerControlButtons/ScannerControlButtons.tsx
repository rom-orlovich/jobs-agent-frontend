import React from 'react';
import { MdOutlineDataSaverOff, MdSave } from 'react-icons/md';
import Spinner from '../Spinner/Spinner';
import ConfirmButton from '../Buttons/ConfirmButton';
import { useAuthContext } from '@/context/AuthContext';

import useScannerController from '@/hooks/useScannerController';
import { FormComponents } from '@/hooks/useUserProfileForm/useUserProfileForm';
const buttonsStyle = {
  buttonsContainer: 'mt-3 flex justify-between gap-2',
  load: 'button-custom flex items-center justify-between gap-2 bg-search-500 hover:bg-search-400 disabled:bg-search-600  text-xl text-white',
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

      <button disabled={disableButtons} className={buttonsStyle.load} onClick={handleLoadButton()}>
        חפש משרות <MdOutlineDataSaverOff />
      </button>

      <Spinner isLoading={scanner.isMutating} />
    </div>
  );
}

export default ScannerControlButtons;
