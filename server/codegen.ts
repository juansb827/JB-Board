import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/**/*.graphql",
  require: ["tsconfig-paths/register"],
  // config: {

  //   resolverTypeWrapperSignature:
  //     "T | Promise<T> | Partial<T> | Promise<Partial<T>>", // allow for partial resolving (useful for field level resolving)
  // },
  generates: {
    "./src/": {
      //https://the-guild.dev/graphql/codegen/docs/guides/graphql-modules
      //https://github.com/darkbasic/graphql-modules-seed/blob/master/codegen.yml
      preset: "graphql-modules",
      config: {
        scalars: {
          ID: "string | number",
          Date: { input: "string", output: "string | JSDate" },
        },
        resolverTypeWrapperSignature:
          //"T | Promise<T> | DeepPartial<T> | Promise<DeepPartial<T>>", // allow for partial resolving (useful for field level resolving)
          "DeepPartial<T>", // allow for partial resolving (useful for field level resolving)
      },
      presetConfig: {
        baseTypesPath: "../generated/graphql/graphql.generated.ts",
        importBaseTypesFrom: "@generated/graphql/graphql.generated",
        filename: "generated-types/module-types.ts",
        useGraphQLModules: false,
      },
      plugins: [
        {
          add: {
            content: `/* eslint-disable */
          import { DeepPartial, JSDate } from "@/shared/types";
            `,
          },
        },
        "typescript",
        "typescript-resolvers",
      ],
    },
  },
};

export default config;
