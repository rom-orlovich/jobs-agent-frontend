import { API_ENDPOINTS, SERVER_URL } from '@/lib/endpoints';
import { UserProfileWithOneUserQuery } from '@/lib/types/api.types';

import React, { MouseEventHandler } from 'react';
import useSWRMutation from 'swr/mutation';

import { MdOutlineDataSaverOff, MdSave } from 'react-icons/md';
import Spinner from '../Spinner/Spinner';
import ConfirmButton from '../Buttons/ConfirmButton';
import { toast } from 'react-toastify';
import { ResponseScanner } from '@/lib/jobsScanner.types';
import { MESSAGES } from '@/lib/messages';
import { useRouter } from 'next/router';
const buttonsStyle = {
  buttonsContainer: 'mt-3 flex justify-between gap-2',
  load: 'button-custom flex items-center justify-between gap-2 bg-loading-500 hover:bg-loading-400 disabled:bg-loading-600  text-xl text-white',
  download:
    'button-custom bg-success-secondary flex items-center justify-between gap-2 disabled:bg-success-primary-600 bg-success-secondary-500 text-xl text-white hover:bg-success-secondary-400'

  //  seacrhButton: 'flex justify-end mt-2'
};
function ScannerControlButtons({ user }: { user: UserProfileWithOneUserQuery }) {
  // Let the user decide if he wants the current query result or all the results that the scanner scan until now base the user queries.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  // const [activeQuery, setActiveQuery] = useState(true);
  console.log(user.userID);

  const createScannerURL = (endpoint: string) => `${SERVER_URL}/${endpoint}/${user.userID}`;

  //Initialize loading scanner fetcher.
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
      console.log(scanner.data);
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
{
  /* <button className="bg-blue-300" onClick={() => setActiveQuery((pre) => !pre)}>
        {activeQuery ? 'בטל' : 'הפעל'} חיפוש לפי חיפוש אחרון
      </button> */
}
// import { useSession } from 'next-auth/react';
// import { FaCloudDownloadAlt } from 'react-icons/fa';
//Initialize downloads fetcher.
// const download = useSWRMutation(createScannerURL(API_ENDPOINTS.SCANNER_DOWNLOAD), (url: string) =>
//   fetch(url).then((res) => res.blob())
// );
//  const session = useSession();
// // Handles the download button click event.
// const handleDownloadButton: MouseEventHandler<HTMLButtonElement> = async (e) => {
//   e.preventDefault();
//   const blob = await download.trigger();
//   if (!blob) return;
//   downloadFile(blob, session.data?.user.name);
// };

// // Attaches the blob result to link element.
// const downloadFile = (blob: Blob, name?: string | null) => {
//   const url = window.URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = `${name?.replace('.', '-') || ''}-jobs.csv`;
//   a.click();
// };

{
  /* <button
        disabled={scanner.isMutating}
        className={buttonsStyle.download}
        onClick={handleDownloadButton}
      >
        הורדה <FaCloudDownloadAlt />    </button> */
}
