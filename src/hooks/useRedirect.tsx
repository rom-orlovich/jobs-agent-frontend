/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReturnCreateToastCBWithData } from '@/lib/utils';
// import { delayFun } from '@/lib/utils';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useOnce from './useOnce';

/**
 * If the data is not found redirect to the provided url.
 * @param {ReturnCreateToastCBWithData} ToastCBWithData object that contains a callback that trigger a toast execution and the data to be return.
 * @returns {R} The data itself.
 */
//
function useRedirect<D>({ data, cb }: ReturnCreateToastCBWithData<D>, url = '/'): D {
  const router = useRouter();
  const { trigger } = useOnce();
  useEffect(() => {
    if (!data) trigger(() => router.push(url, url));
    router.events.on('routeChangeComplete', () => {
      trigger(() => cb());
    });
  }, [router, trigger, url, data, cb]);
  return data as D;
}

export default useRedirect;
