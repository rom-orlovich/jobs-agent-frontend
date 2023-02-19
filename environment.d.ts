export {};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_DB_URI: string;
      EXPIRE_AT: number;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      JWT_SECRET: string;
    }
  }
}