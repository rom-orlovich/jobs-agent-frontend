/* eslint-disable @typescript-eslint/no-explicit-any */

import { API_ENDPOINTS } from '@/lib/endpoints';
import { Args } from '@/lib/jobsScanner.types';

import { createScannerURL } from '@/lib/utils';
import { MouseEventHandler } from 'react';
import { Key } from 'swr';
import useSWRMutation from 'swr/mutation';
import { ReturnTypeUseAuthProfileExist } from './useAuth';
function useDownloadController({ user }: ReturnTypeUseAuthProfileExist) {
  const downloadURL = createScannerURL(API_ENDPOINTS.SCANNER_DOWNLOAD, user?.id);

  const downloadState = useSWRMutation<Blob, any, Key, { hash?: string }>(
    downloadURL,
    (url: string, options: Args) => fetch(`${url}?hash=${options.arg.hash}`).then((res) => res.blob())
  );

  // // Attaches the blob result to link element.
  const downloadFile = (blob: Blob, name?: string | null) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name?.replace('.', '-') || ''}-jobs.csv`;
    a.click();
  };

  // // Handles the download button click event.
  const handleDownloadButton: (hash?: string) => MouseEventHandler<HTMLButtonElement> =
    (hash) => async (e) => {
      e.preventDefault();
      const blob = await downloadState.trigger({
        hash
      });
      if (!blob) return;
      downloadFile(blob, user?.name);
    };
  return {
    downloadState,
    handleDownloadButton
  };
}

export default useDownloadController;

export type UseDownloadHooksProps = ReturnType<typeof useDownloadController>;
