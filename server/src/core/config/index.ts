import "dotenv/config";

/*
 Configuration should only be accessed using the object exported below
 no call to process.env... or node-config should be done elsewhere
*/
export const serverConfig = {
  databaseUrl: process.env.DATABASE_URL,
};
