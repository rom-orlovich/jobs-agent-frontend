export {};
//* <button className="bg-blue-300" onClick={() => setActiveQuery((pre) => !pre)}>
//   {activeQuery ? 'בטל' : 'הפעל'} חיפוש לפי חיפוש אחרון
// </button> */

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
/* <button
          disabled={scanner.isMutating}
          className={buttonsStyle.download}
          onClick={handleDownloadButton}
        >
          הורדה <FaCloudDownloadAlt />    </button> */
