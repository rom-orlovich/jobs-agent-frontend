/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth';

import { JWT } from 'next-auth/jwt';
import { GenericRecord } from './lib/types';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}
declare module 'next-auth' {
  interface Session {
    user: User & GenericRecord<string>;
  }
  export interface JWT extends Record<string, unknown>, DefaultJWT {
    user: User | AdapterUser | undefined;
  }
}
declare module 'next-auth/jwt' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface JWT extends User {}
}
