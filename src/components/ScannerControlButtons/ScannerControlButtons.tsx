import { API_ENDPOINTS, SERVER_URL } from '@/lib/endpoints';
import React, { MouseEventHandler } from 'react';
import useSWRMutation from 'swr/mutation';

import { MdOutlineDataSaverOff, MdSave } from 'react-icons/md';
import Spinner from '../Spinner/Spinner';
import ConfirmButton from '../Buttons/ConfirmButton';
import { toast } from 'react-toastify';
import { ResponseScanner } from '@/lib/jobsScanner.types';
import { MESSAGES } from '@/lib/messages';
import { useRouter } from 'next/router';
import { useAuthContext } from '@/context/AuthContext';
const buttonsStyle = {
  buttonsContainer: 'mt-3 flex justify-between gap-2',
  load: 'button-custom flex items-center justify-between gap-2 bg-search-500 hover:bg-search-400 disabled:bg-search-600  text-xl text-white',
  download:
    'button-custom bg-success-secondary flex items-center justify-between gap-2 disabled:bg-success-primary-600 bg-success-secondary-500 text-xl text-white hover:bg-success-secondary-400'
};
function ScannerControlButtons() {
  // Let the user decide if he wants the current query result or all the results that the scanner scan until now base the user queries.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();

  const { userProfileData } = useAuthContext();
  const createScannerURL = (endpoint: string) => `${SERVER_URL}/${endpoint}/${userProfileData.userID}`;

  //Initialize search scanner fetcher.
  const scanner = useSWRMutation<ResponseScanner>(
    createScannerURL(API_ENDPOINTS.SCANNER_START),
    (url: string) => fetch(url).then((res) => res.json())
  );
  // Handles the Load button click event.
  const handleLoadButton: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    try {
      await scanner.trigger();
      toast(MESSAGES[scanner?.data?.code || 5]);
    } catch (error) {
      toast(MESSAGES[scanner?.data?.code || 5]);
      console.log(error);
    } finally {
      router.push('/jobs');
    }
  };

  return (
    <div className={buttonsStyle.buttonsContainer}>
      <ConfirmButton type="submit">
        שמור חיפוש <MdSave />
      </ConfirmButton>

      <button disabled={scanner.isMutating} className={buttonsStyle.load} onClick={handleLoadButton}>
        חפש משרות <MdOutlineDataSaverOff />
      </button>

      <Spinner isLoading={scanner.isMutating} />
    </div>
  );
}

export default ScannerControlButtons;
