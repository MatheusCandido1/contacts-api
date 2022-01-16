declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLEARDB_DATABASE_URL: string;//root:@localhost/db_mycontacts
      PORT?: number;
      APP_ENV: string;
    }
  }
}