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
import { UserProfile } from '@/lib/types/user.types';
import { useSwrHook } from '@/lib/swr';
import axios from 'axios';
import { useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { checkUserProfileValid } from './useProfileForm/utils';

interface ScannerStatus {
  status: number;
  id: string;
}

function useScannerController(userID: string) {
  const { userProfileData } = useAuthContext();
  const router = useRouter();
  const scannerURL = createURLPath([CLIENT_URL, API_ENDPOINTS.SCANNER_START, userID]);

  const scannerStatusURL = createURLPath([CLIENT_URL, API_ENDPOINTS.SCANNER_STATUS]);
  //Initialize scanner mutation.
  const scanner = useSWRMutation<ScannerStatus, any, Key, { hash?: string }>(
    scannerURL,
    (url: string, options: Args) =>
      axios(`${url}?${covertQueryParamsToString(options.arg)}`).then((res) => res.data)
  );
  const [scannerState, setScannerState] = useState<ScannerStatus | undefined>(undefined);
  const isRefreshActive = scannerState && scannerState.status === 100;

  //Initialize status scanner fetcher.
  useSwrHook<ScannerStatus>(
    isRefreshActive ? createURLPath([scannerStatusURL, scannerState?.id]) : null,
    (url) => axios(url).then((res) => res.data),
    {
      refreshInterval: isRefreshActive ? 1000 * 5 : 0,
      revalidateOnMount: false,

      //Check if the scanning is done.
      async onSuccess(data) {
        //Check if the scanning success.
        if (data.status === 200) {
          setScannerState(data);

          const res = await userMutate<{ data: UserProfile }>(`/${API_ENDPOINTS.USERS}/${userID}`);

          router.push({
            pathname: `/${APP_ROUTES.JOBS_PAGE}`,
            query: {
              hash: res?.data.activeHash
            }
          });
        }

        //Check if the scanning failed.
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

    //Check for valid location and position fields that their values are not empty.
    const messageObj = checkUserProfileValid(userProfileData);

    if (messageObj) {
      toast(messageObj.message);
      return messageObj;
    }

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
      isMutating: scannerState?.status === 100 //If the status is 100 (pending), the isMutating is true.
    }
  };
}

export default useScannerController;
export type ReturnTypeUseScannerHooksProps = ReturnType<typeof useScannerController>;
