/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';

import { JWT } from 'next-auth/jwt';
import { GenericRecord } from './lib/types';
declare module 'next-auth' {
  interface Session {
    user: User & GenericRecord<string>;
  }
}
declare module 'next-auth/jwt' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface JWT {
    user: User | AdapterUser | undefined;
  }
}
