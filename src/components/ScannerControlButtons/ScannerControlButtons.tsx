import { API_ENDPOINTS, SERVER_URL } from '@/lib/endpoints';
import { UserOptions } from '@/lib/types/user.types';
import { useSession } from 'next-auth/react';

import React, { MouseEventHandler, useState } from 'react';
import useSWRMutation from 'swr/mutation';

function ScannerControlButtons({ user }: { user: UserOptions }) {
  // Let the user decide if he wants the current query result or all the results that the scanner scan until now base the user queries.
  const [activeQuery, setActiveQuery] = useState(true);

  const session = useSession();

  const createScannerURL = (endpoint: string) =>
    `${SERVER_URL}/${endpoint}/${user.userID}?activeQuery=${activeQuery}`;

  //Initialize loading scanner fetcher.
  const scanner = useSWRMutation(createScannerURL(API_ENDPOINTS.SCANNER_START), (url: string) =>
    fetch(url).then((res) => res.json())
  );

  //Initialize downloads fetcher.
  const download = useSWRMutation(createScannerURL(API_ENDPOINTS.SCANNER_DOWNLOAD), (url: string) =>
    fetch(url).then((res) => res.blob())
  );

  // Handles the Load button click event.
  const handleLoadButton: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    await scanner.trigger();
    console.log(scanner.data);
  };

  // Attaches the blob result to link element.
  const downloadFile = (blob: Blob, name?: string | null) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name || ''}-jobs`;
    a.click();
  };

  // Handles the download button click event.
  const handleDownloadButton: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const blob = await download.trigger();
    if (!blob) return;
    downloadFile(blob, session.data?.user.name);
  };

  return (
    <>
      <button className="mr-2" onClick={handleLoadButton}>
        טען
      </button>
      <button onClick={handleDownloadButton}>הורד</button>
      <button className="bg-blue-300" onClick={() => setActiveQuery((pre) => !pre)}>
        {activeQuery ? 'בטל' : 'הפעל'} חיפוש לפי חיפוש אחרון
      </button>
      {scanner.isMutating && <p>טוען...</p>}
    </>
  );
}

export default ScannerControlButtons;
