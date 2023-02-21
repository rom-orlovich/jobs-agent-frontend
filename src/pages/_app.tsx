import '@/styles/globals.css';
import { Poppins } from '@next/font/google';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import Layout from '@/components/Layout/Layout';
import { classNameGenerator } from '@/lib/utils';
const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin']
});
type AppPropsWithSession = AppProps & { session: Session };

export default function App({ Component, pageProps, session }: AppPropsWithSession) {
  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          fetcher: (resource, init) => fetch(resource, init).then((res) => res.json())
        }}
      >
        <Layout>
          <main className={classNameGenerator(poppins.className)}>
            <Component {...pageProps} />
          </main>
        </Layout>
      </SWRConfig>
    </SessionProvider>
  );
}
