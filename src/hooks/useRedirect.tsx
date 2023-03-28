/* eslint-disable @typescript-eslint/no-explicit-any */

import { delayFun, ReturnCreateToastCBWithData } from '@/lib/utils';
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
  const { trigger: triggerOnChange } = useOnce();
  router.events.on('routeChangeComplete', () => {
    triggerOnChange(() => {
      delayFun(cb, 200);
    });
  });
  useEffect(() => {
    if (!data) trigger(() => router.push(url, url));
  }, [router, trigger, url, data]);
  return data as D;
}

export default useRedirect;
