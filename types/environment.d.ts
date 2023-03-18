export {};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_DB_URI: string;
      EXPIRE_AT: number;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;

      NEXT_PUBLIC_SERVER_URL: string;
      NEXT_PUBLIC_CLIENT_URL: string;
      NEXT_PUBLIC_CLIENT_DEV_URL: string;
    }
  }
}
