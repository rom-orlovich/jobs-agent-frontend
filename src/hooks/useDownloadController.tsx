/* eslint-disable @typescript-eslint/no-explicit-any */

import { TriggerByHash } from '@/components/Buttons/Button.types';
import { useAuthContext } from '@/context/AuthContext';
import { API_ENDPOINTS, CLIENT_URL } from '@/lib/endpoints';
import { Args } from '@/lib/types/jobsScanner.types';

import { createURLPath } from '@/lib/utils';

import { Key } from 'swr';
import useSWRMutation from 'swr/mutation';

function useDownloadController() {
  const { user } = useAuthContext();
  const downloadURL = createURLPath([CLIENT_URL, API_ENDPOINTS.SCANNER_DOWNLOAD, user?.id]);

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
  const handleDownloadButton: TriggerByHash = (hash) => async (e) => {
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
