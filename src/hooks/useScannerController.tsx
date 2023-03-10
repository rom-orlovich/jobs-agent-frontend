/* eslint-disable @typescript-eslint/no-explicit-any */

import { covertQueryParamsToString, createURLPath } from '@/lib/utils';

import { Key, mutate as userMutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { API_ENDPOINTS, CLIENT_URL } from '@/lib/endpoints';

import { Args } from '@/lib/types/jobsScanner.types';
import { useRouter } from 'next/router';

import { MESSAGES, MESSAGE_CODES } from '@/lib/messages';
import { toast } from 'react-toastify';
import { APP_ROUTES } from '@/lib/routes';
import { TriggerByHash } from '@/components/Buttons/Button.types';
import { UserProfile } from '@/lib/types/api.types';
import { useSwrHook } from '@/lib/swr';
import axios from 'axios';
import { useState } from 'react';

interface ScannerStatus {
  status: number;
  id: string;
}

function useScannerController(userID: string) {
  const router = useRouter();
  const scannerURL = createURLPath([CLIENT_URL, API_ENDPOINTS.SCANNER_START, userID]);
  // const scannerURL = createURLPath([CLIENT_URL, 'api/jobs-agent/test', userID]);
  const scannerStatusURL = createURLPath([CLIENT_URL, API_ENDPOINTS.SCANNER_STATUS]);
  //Initialize scanner mutation.
  const scanner = useSWRMutation<ScannerStatus, any, Key, { hash?: string }>(
    scannerURL,
    (url: string, options: Args) =>
      axios(`${url}?${covertQueryParamsToString(options.arg)}`).then((res) => res.data)
  );
  const [scannerState, setScannerState] = useState<ScannerStatus | undefined>(undefined);
  console.log('scannerState', scannerState);

  const isRefreshActive = scannerState && scannerState.status === 100;

  console.log(scannerState?.status === 100);
  //Initialize status scanner fetcher.
  useSwrHook<ScannerStatus>(
    scannerState ? createURLPath([scannerStatusURL, scannerState?.id]) : null,
    (url) => axios(url).then((res) => res.data),
    {
      refreshInterval: isRefreshActive ? 1000 * 5 : 0,
      revalidateOnMount: false,

      //Check if the scanner is done.
      async onSuccess(data) {
        if (data.status === 200) {
          console.log('success');
          setScannerState(data);

          const res = await userMutate<{ data: UserProfile }>(`/${API_ENDPOINTS.USERS}/${userID}`);

          router.push({
            pathname: `/${APP_ROUTES.JOBS_PAGE}`,
            query: {
              hash: res?.data.activeHash
            }
          });
        }
        if (data.status === 300) {
          setScannerState(data);
          toast(MESSAGES[MESSAGE_CODES.JOBS_ARE_NOT_FOUND]);
        }
      }
    }
  );

  // Handles the Load button click event.
  const handleLoadButton: TriggerByHash = (hash) => async (e) => {
    e.preventDefault();
    try {
      toast(MESSAGES[MESSAGE_CODES.SEARCH_IS_IN_PROCESS]);
      const res = await scanner.trigger({
        hash: hash
      });

      //Set current status of scanner.
      setScannerState(res);
    } catch (error) {
      toast(MESSAGES[MESSAGE_CODES.JOBS_ARE_NOT_FOUND]);
      console.log(error);
    }
  };
  return {
    handleLoadButton,
    scanner: {
      ...scanner,
      isMutating: scannerState?.status === 100
    }
  };
}

export default useScannerController;
export type ReturnTypeUseScannerHooksProps = ReturnType<typeof useScannerController>;
