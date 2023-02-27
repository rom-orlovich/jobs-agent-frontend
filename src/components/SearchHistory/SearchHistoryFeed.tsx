import { useAuthContext } from '@/context/AuthContext';
import React from 'react';
import SearchItem from './SearchItem';

import useDownloadController from '@/hooks/useDownloadController';

const searchHistoryFeedStyle = {
  feed: 'pr-12 md:pr-16 flex flex-col lg:max-w-[60%] max-w-[100%]'
};
function SearchHistoryFeed() {
  // const { userProfileData } = useAuthContext();

  // const createScannerURL = (endpoint: string) =>
  //   createURL([SERVER_URL, endpoint, userProfileData.userID || '']);
  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const download = useSWRMutation<Blob, any, Key, { hash: string }>(
  //   createScannerURL(API_ENDPOINTS.SCANNER_DOWNLOAD),
  //   (url: string, options: Readonly<{ arg: { hash: string } }>) =>
  //     fetch(`${url}?hash=${options.arg.hash}`).then((res) => res.blob())
  // );
  // const scanner = useSWRMutation<Blob, any, Key, { hash: string }>(
  //   createScannerURL(API_ENDPOINTS.SCANNER_START),
  //   (url: string, options: Readonly<{ arg: { hash: string } }>) =>
  //     fetch(`${url}?hash=${options.arg.hash}`).then((res) => res.json())
  // );
  // const handleButtonTriggerDownload = async (hash: string) =>
  //   download.trigger({
  //     hash
  //   });
  // const handleButtonTriggerScanner = async (hash: string) =>
  //   scanner.trigger({
  //     hash
  //   });

  // // // Handles the download button click event.
  // const handleDownloadButton: MouseEventHandler<HTMLButtonElement> = async (e) => {
  //   e.preventDefault();
  //   const blob = await download.trigger();
  //   if (!blob) return;
  //   downloadFile(blob, session.data?.user.name);
  // };

  // // // Attaches the blob result to link element.
  // const downloadFile = (blob: Blob, name?: string | null) => {
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = `${name?.replace('.', '-') || ''}-jobs.csv`;
  //   a.click();
  // };
  const authContext = useAuthContext();
  const downloadController = useDownloadController(authContext);

  const { userHistoryQueries } = authContext;
  return (
    <ul className={searchHistoryFeedStyle.feed}>
      {userHistoryQueries.map((query, i) => {
        const hash = query?.hash || '';
        return <SearchItem key={hash + i} {...query} {...downloadController} />;
      })}
    </ul>
  );
}

export default SearchHistoryFeed;
