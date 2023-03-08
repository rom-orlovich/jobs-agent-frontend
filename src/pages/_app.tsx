import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import Layout from '@/components/Layout/Layout';
import Toasts from '@/components/Toasts/Toasts';
import { GenericRecord } from '@/lib/types/types';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AppPropsWithSession = AppProps & { session: Session } & { fallback: GenericRecord<any> };
export default function App({ Component, pageProps, session }: AppPropsWithSession) {
  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          fetcher: (resource, init) => fetch(resource, init).then((res) => res.json())
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Toasts />
      </SWRConfig>
    </SessionProvider>
  );
}
