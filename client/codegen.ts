import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql",
  documents: ["src/**/*.ts"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./generated/graphql/": {
      preset: "client",
      config: {
        scalars: {
          Date: "string",
        },
      },
    },
  },
};

export default config;
