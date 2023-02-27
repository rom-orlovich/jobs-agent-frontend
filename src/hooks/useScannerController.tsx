/* eslint-disable @typescript-eslint/no-explicit-any */

import { covertObjToString, createScannerURL } from '@/lib/utils';

import { Key } from 'swr';
import useSWRMutation from 'swr/mutation';
import { API_ENDPOINTS } from '@/lib/endpoints';
import { ReturnTypeUseAuthProfileExist } from './useAuth';
import { Args, ResponseScanner } from '@/lib/jobsScanner.types';
import { useRouter } from 'next/router';
import { MouseEventHandler } from 'react';
import { MESSAGES } from '@/lib/messages';
import { toast } from 'react-toastify';
function useScannerController({ user }: ReturnTypeUseAuthProfileExist) {
  const router = useRouter();
  const scannerURL = createScannerURL(API_ENDPOINTS.SCANNER_START, user?.id);
  console.log(scannerURL);

  //Initialize search scanner fetcher.
  const scanner = useSWRMutation<ResponseScanner, any, Key, { hash?: string }>(
    scannerURL,
    (url: string, options: Args) =>
      fetch(`${url}?${covertObjToString(options.arg)}`).then((res) => res.json())
  );

  // Handles the Load button click event.
  const handleLoadButton: (hash?: string) => MouseEventHandler<HTMLButtonElement> =
    (hash) => async (e) => {
      e.preventDefault();
      try {
        toast(MESSAGES[5]);
        await scanner.trigger({
          hash
        });

        toast(MESSAGES[scanner?.data?.code || 100]);
      } catch (error) {
        toast(MESSAGES[scanner?.data?.code || 100]);
        console.log(error);
      } finally {
        router.push('/jobs');
      }
    };
  return {
    handleLoadButton,
    scanner
  };
}

export default useScannerController;
export type UseScannerHooksProps = ReturnType<typeof useScannerController>;
