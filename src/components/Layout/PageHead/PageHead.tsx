import Head from 'next/head';
import React from 'react';

function PageHead({ title, description }: { title: string; description?: string }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

export default PageHead;
