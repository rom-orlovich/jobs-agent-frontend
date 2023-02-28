/* eslint-disable @typescript-eslint/no-explicit-any */

import { covertObjToString, createScannerURL } from '@/lib/utils';

import { Key, mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { API_ENDPOINTS } from '@/lib/endpoints';
import { ReturnTypeUseAuthProfileExist } from './useAuth';
import { Args, ResponseScanner } from '@/lib/jobsScanner.types';
import { useRouter } from 'next/router';

import { MESSAGES, MESSAGE_CODES } from '@/lib/messages';
import { toast } from 'react-toastify';
import { APP_ROUTES } from '@/lib/routes';
import { TriggerByHash } from '@/components/Buttons/Button.types';
function useScannerController({ user }: ReturnTypeUseAuthProfileExist) {
  const router = useRouter();
  const scannerURL = createScannerURL(API_ENDPOINTS.SCANNER_START, user?.id);

  //Initialize search scanner fetcher.
  const scanner = useSWRMutation<ResponseScanner, any, Key, { hash?: string }>(
    scannerURL,
    (url: string, options: Args) =>
      fetch(`${url}?${covertObjToString(options.arg)}`).then((res) => res.json())
  );

  // Handles the Load button click event.
  const handleLoadButton: TriggerByHash = (hash) => async (e) => {
    e.preventDefault();
    try {
      toast(MESSAGES[MESSAGE_CODES.SEARCH_IS_IN_PROCESS]);
      await scanner.trigger({
        hash
      });
      await mutate(`/api/users/${user?.id}`);
    } catch (error) {
      toast(MESSAGES[MESSAGE_CODES.NOT_JOB_IS_FOUND]);
      console.log(error);
    } finally {
      router.push({
        pathname: `/${APP_ROUTES.JOBS_PAGE}`,
        query: {
          hash
        }
      });
    }
  };
  return {
    handleLoadButton,
    scanner
  };
}

export default useScannerController;
export type UseScannerHooksProps = ReturnType<typeof useScannerController>;
