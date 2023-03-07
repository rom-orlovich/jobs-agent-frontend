import React, { PropsWithChildren } from 'react';
const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin']
});
import { Roboto } from '@next/font/google';
function Main({ children }: PropsWithChildren) {
  return <main className={roboto.className + ' ' + 'bg-background' + ' min-h-[100vh]'}>{children}</main>;
}

export default Main;
